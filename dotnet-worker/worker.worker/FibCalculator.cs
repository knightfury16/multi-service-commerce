using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace worker.worker
{
    public class FibCalculator
    {
        public int CalculateFibonacci(int n)
        {
            if (n <= 1)
            {
                return n;
            }
            else
            {
                // Recursive call to calculate Fibonacci of (n-1) and (n-2), and then sum them up
                return CalculateFibonacci(n - 1) + CalculateFibonacci(n - 2);
            }
        }
    }
}
