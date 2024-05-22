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
                var body = ea.Body.ToArray();
                var valueStr = Encoding.UTF8.GetString(body);

                Console.WriteLine($"Saving value");

                string[] valueSplit = valueStr.Split(':');
                string userKey = valueSplit[0];
                string userCall = valueSplit[1];

                Console.WriteLine("Saving value to redis");
                redisClient.SaveToRedis(userKey, userCall.ToString());
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
