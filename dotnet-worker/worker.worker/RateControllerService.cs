using Microsoft.Extensions.Hosting;
using RabbitMQ.Client.Events;
using RabbitMQ.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace worker.worker
{
    public class RateControllerService : IHostedService
    {
        private RedisClient _redisClient;
        private RabbitMqClient _rabbitMqClient;

        public RateControllerService(RabbitMqClient rabbitMqClient, RedisClient redisClient)
        {
            _redisClient = redisClient;
            _rabbitMqClient = rabbitMqClient;

        }

        public Task StartAsync(CancellationToken cancelationToken)
        {

            // RabbitMqClient rabbitMqClient = _rabbitMqClient.GetInstance();
            // RedisClient redisClient = _redisClient.GetInstance();
            RedisClient redisClient = _redisClient;
            IConnection connection = _rabbitMqClient.GetConnection();


            IModel channel = connection.CreateModel();

            var queue = "RATE_CONTROL";

            channel.QueueDeclare(queue, durable: false, exclusive: false, autoDelete: false, arguments: null);

            var consumer = new EventingBasicConsumer(channel);

            consumer.Received += (model, ea) =>
            {
                try
                {
                    var body = ea.Body.ToArray();
                    var valueStr = Encoding.UTF8.GetString(body);

                    Console.WriteLine($"Saving value {valueStr}");

                    string[] valueSplit = valueStr.Split(':');
                    string userKey = valueSplit[0];
                    string userCall = valueSplit[1];
                    int reqNumber = 0;

                    //weird, string null is not checked in string.nullOrEmpty()
                    if(string.Equals(userCall, "null"))
                    {
                        reqNumber = 1;
                    }
                    else
                    {
                        reqNumber = int.Parse(userCall);
                        reqNumber++;
                    }

                    redisClient.SaveToRedis(userKey, reqNumber.ToString());
                }
                catch (System.Exception e)
                {
                    throw new Exception(e.Message);
                }
            };

            channel.BasicConsume(
                queue: queue,
                autoAck: true,
                consumer);

            Console.WriteLine("Rate Controller Service started, waiting for message...");

            return Task.CompletedTask;

        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            // Cleanup logic can be added here if needed
            return Task.CompletedTask;
        }
    }
}
