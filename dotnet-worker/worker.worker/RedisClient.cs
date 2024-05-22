using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using StackExchange.Redis;

namespace worker.worker
{
    public class RedisClient
    {
        private static RedisClient _instance;
        private static readonly object _lock = new object();
        private readonly Lazy<ConnectionMultiplexer> _lazyConnection;

        private RedisClient()
        {
            _lazyConnection = new Lazy<ConnectionMultiplexer>(() => ConnectionMultiplexer.Connect(CreateConfigurationOption()));
        }

        public static RedisClient GetInstance()
        {
            if (_instance == null)
            {
                lock (_lock)
                {
                    if (_instance == null)
                    {
                        _instance = new RedisClient();
                    }
                }
            }
            return _instance;
        }

        public void SaveToRedis(string key, string value)
        {
            Console.WriteLine($"Saving to redis of key {key} and {value}");
            var db = _lazyConnection.Value.GetDatabase();
            db.StringSet( key, value);
        }

        public string GetFromRedis(string key)
        {
            Console.WriteLine($"Fetching value from redis with {key}");
            var db = _lazyConnection.Value.GetDatabase();
            return db.StringGet(key);
        }

        private ConfigurationOptions CreateConfigurationOption()
        {
            var configOptions = new ConfigurationOptions
            {
                EndPoints = { GetRedisConnectionString() },
                ConnectRetry = 5, // The number of times to retry connecting
                ReconnectRetryPolicy = new ExponentialRetry(5000, 20000), // Exponential backoff for retries
                ConnectTimeout = 1000 // Timeout for connecting
            };

            return configOptions;
        }
        private string GetRedisConnectionString()
        {
            string redisConfig;

            // Get Redis configuration string from environment variable
            string? redisHost = Environment.GetEnvironmentVariable("REDIS_HOST") ?? "localhost";
            string? redisPort = Environment.GetEnvironmentVariable("REDIS_PORT") ?? "6379";
            redisConfig = redisHost + ":" + redisPort;

            return redisConfig;
        }
    }
}
