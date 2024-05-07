const { parentPort } = require("worker_threads");

const Task = () => {
  const Factorial = (n) => {
    if (n == 1) return 1;
    else return n * Factorial(n - 1);
  };
  const isPrime = (n) => {
    let flag = 0;
    for (let i = 1; i <= n; i++) {
      if (n % i == 0) flag++;
    }
    if (flag == 2) return true;
    else return false;
  };
  const times = 20000;
  const limit = 10;
  const Arr = [];
  for (let i = 1; i < times; i++) {
    const Ar = [];
    for (let j = 1; j < limit; j++) {
      const x = Factorial(j);
      //   const y = isPrime(x);
      Ar.push({ iter: i, num: j, factorial: x, prime: isPrime(x) });
    }
    Arr.push(Ar);
  }
  return Arr;
};

parentPort.on("message", (payload) => {
  new Promise((resolve, reject) => {
    resolve(Task());
  })
    .then((data) => parentPort.postMessage(data))
    .catch((err) => parentPort.postMessage(null));
});
