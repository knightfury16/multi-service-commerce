import  redisClient  from "./redisClient.js";
import subscriber from "./subscriber.js"

(async () => {

  const listener = async (message, channel) => {
    console.log(`Calculating Fibonacci value of ${message}`);
    const fiboValue = FibonacchiCalculator(parseInt(message));
    console.log(`Fibonacci value calculated: ${fiboValue}`);

    try {
      await redisClient.hSet("values", message, fiboValue);
      console.log(`Fibonacci value saved in Redis successfully.`);
    } catch (err) {
      console.error("Error setting value in Redis:", err);
    }
  };

  await subscriber.subscribe("calculate-fib", listener);
})();

function FibonacchiCalculator(index) {
  if (index < 0) return 0; // Base case: Fibonacci numbers are defined for non-negative integers
  if (index < 2) return 1; // Base case: Fibonacci numbers for index 0 and 1 are 1
  return FibonacchiCalculator(index - 1) + FibonacchiCalculator(index - 2);
}
