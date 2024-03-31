using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using StackExchange.Redis;
using System.Text;

namespace worker.worker;

class Program
{
    static void Main(string[] args)
    {

        RabbitMqClient rabbitMqClient = RabbitMqClient.GetInstance();
        RedisClient redisClient = RedisClient.GetInstance();
        IConnection connection = rabbitMqClient.GetConnection();

        IModel channel = connection.CreateModel();

        var queue = "fibvalue";

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
            redisClient.SaveToRedis("fibValue", result.ToString());
        };

        channel.BasicConsume(
            queue: queue,
            autoAck: true,
            consumer);

        Console.WriteLine(" Press [enter] to exit.");
        Console.ReadLine();
        connection.Close();
    }
}
