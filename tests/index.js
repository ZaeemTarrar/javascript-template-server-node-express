const path = require("path");
const { performance } = require("perf_hooks");
const { Worker } = require("worker_threads");

const task = () => {
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
  const times = 500;
  const limit = 10;
  const Arr = [];
  for (let i = 1; i < times; i++) {
    const Ar = [];
    for (let j = 1; j < limit; j++) {
      const x = Factorial(j);
      const y = isPrime(x);
      if (y) Ar.push(x);
    }
    Arr.push(Ar);
  }
  return Arr;
};

const Launch = async () => {
  const rounds = 10;
  const t1 = performance.now();
  for (let i = 0; i < rounds; i++) {
    task();
  }
  const t2 = performance.now();
  console.log("Duration1: ", Number((+t2 - +t1) / 1000).toFixed(3) + " sec");

  const t3 = performance.now();
  const P = [];
  for (let i = 0; i < rounds; i++) {
    P.push(
      new Promise((resolve, reject) => {
        const worker = new Worker(path.join(__dirname, "./worker.js"), {});
        worker.on("message", (data) => resolve(data));
        worker.on("error", (error) => resolve(error));
      })
    );
  }
  await Promise.all(P);
  const t4 = performance.now();
  console.log("Duration2: ", Number((+t4 - +t3) / 1000).toFixed(3) + " sec");

  const t5 = performance.now();
  const P2 = [];
  for (let i = 0; i < rounds; i++) {
    P2.push(new Promise((resolve, reject) => resolve(task())));
  }
  await Promise.all(P2);
  const t6 = performance.now();
  console.log("Duration3: ", Number((+t6 - +t5) / 1000).toFixed(3) + " sec");

  const t7 = performance.now();
  for (let i = 0; i < rounds; i++) {
    await new Promise((resolve, reject) => resolve(task()));
  }
  const t8 = performance.now();
  console.log("Duration4: ", Number((+t8 - +t7) / 1000).toFixed(3) + " sec");

  const t9 = performance.now();
  for (let i = 0; i < rounds; i++) {
    await new Promise((resolve, reject) => {
      const worker = new Worker(path.join(__dirname, "./worker.js"), {});
      worker.on("message", (data) => resolve(data));
      worker.on("error", (error) => resolve(error));
    });
  }
  const t10 = performance.now();
  console.log("Duration5: ", Number((+t10 - +t9) / 1000).toFixed(3) + " sec");
};

Launch();
