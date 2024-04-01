using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using StackExchange.Redis;
using System.Text;
using System.Threading;

namespace worker.worker
{

    public class WorkerService: IHostedService
    {
        private readonly RabbitMqClient _rabbitMqClient;
        private readonly RedisClient _redisClient;

        public WorkerService(RabbitMqClient rabbitMqClient, RedisClient redisClient){
            _redisClient = redisClient;
            _rabbitMqClient = rabbitMqClient;

        }

        public Task StartAsync(CancellationToken cancelationToken){

            // RabbitMqClient rabbitMqClient = _rabbitMqClient.GetInstance();
            // RedisClient redisClient = _redisClient.GetInstance();
            RedisClient redisClient = _redisClient;
            IConnection connection = _rabbitMqClient.GetConnection();


            IModel channel = connection.CreateModel();

            var queue = "calculate-fib";

            channel.QueueDeclare(queue, durable: false, exclusive: false, autoDelete: false, arguments: null);

            var consumer = new EventingBasicConsumer(channel);

            consumer.Received += (model, ea) =>
            {
                var body = ea.Body.ToArray();
                var valueStr = Encoding.UTF8.GetString(body);
                int valueInt = int.Parse(valueStr);

                Console.WriteLine($"Received value {valueInt}");
                Console.WriteLine($"Calculating Fib value");

                FibCalculator fibCalculator = new FibCalculator();

                var result = fibCalculator.CalculateFibonacci(valueInt);

                Console.WriteLine($"Fib value calculation complete. Result = {result}");


                Console.WriteLine("Saving value to redis");
                redisClient.SaveToRedis(valueStr, result.ToString());
            };

            channel.BasicConsume(
                queue: queue,
                autoAck: true,
                consumer);

            Console.WriteLine("Worker started, waiting for message...");

            return Task.CompletedTask;

        }
        public Task StopAsync(CancellationToken cancellationToken)
        {
            // Cleanup logic can be added here if needed
            return Task.CompletedTask;
        }

    }

}
