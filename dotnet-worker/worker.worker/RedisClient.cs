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
            _lazyConnection = new Lazy<ConnectionMultiplexer>(() => ConnectionMultiplexer.Connect(GetRedisConnectionString()));
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
            db.HashSet("values", key , value);
        }

        public string GetFromRedis(string key)
        {
            Console.WriteLine($"Fetching value from redis with {key}");
            var db = _lazyConnection.Value.GetDatabase();
            return db.StringGet(key);
        }

        private string GetRedisConnectionString()
        {
            string redisConfig;
            // Get Redis configuration string from environment variable
            string? redisHost = Environment.GetEnvironmentVariable("REDIS_HOST");
            string? redisPort = Environment.GetEnvironmentVariable("REDIS_PORT");

            // Use default value if not found in environment
            if (string.IsNullOrEmpty(redisHost) || string.IsNullOrEmpty(redisPort))
            {
                redisConfig = "redis:6379"; // Default Redis configuration
            }
            else
            {
                redisConfig = redisHost + ":" + redisPort;
            }

            return redisConfig;
        }
    }
}
