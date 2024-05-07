const express = require("express");
const path = require("path");
const { Worker } = require("worker_threads");
const { WELCOME } = require("./../../../../data/static/messages/api/index");
const ApiRouteHandler = require("../../../../handlers/apiRoute");

const APIs = express.Router();

APIs.use("/post", require("./post"));

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

const Thread = (path) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker(path);
    worker.postMessage(null);
    worker.on("message", (data) => resolve(data));
    worker.on("error", (error) => reject(error));
  });
};

APIs.get("/go", (req, res) => {
  const result = { data: null };
  //   console.log(result);
  res.json(result);
});
// APIs.get("/", async (req, res) => {
//   res.startTracking();
//   const result = [Task(), Task()];
//   //   const url = path.join(__dirname, "./../../../../../tests/worker.js");
//   //   const result = await Promise.all([Thread(url), Thread(url)]);
//   res.stopTracking();
//   res.json({ data: result });
// });

module.exports = ApiRouteHandler(APIs);
