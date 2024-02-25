require("dotenv").config();

const Test = () => {
  console.log("Testing: ", parseInt(process.env.PORT));
};

Test();
