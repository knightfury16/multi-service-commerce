using RabbitMQ.Client;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using RabbitMQ.Client.Events;
using StackExchange.Redis;
using System.Text;

namespace worker.worker;

class Program
{
    public static void Main(string[] args)
    {
        CreateHostBuilder(args).Build().Run();

    }
    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureServices((hostContext, services) =>
            {
                services.AddSingleton<RabbitMqClient>(_ => RabbitMqClient.GetInstance());
                services.AddSingleton<RedisClient>(_ => RedisClient.GetInstance());
                services.AddHostedService<WorkerService>(); // Add the WorkerService as a hosted service
                services.AddHostedService<RateControllerService>();
            });
}
