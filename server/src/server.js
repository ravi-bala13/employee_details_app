const connect = require("./configs/db");

const app = require("./index");

app.listen(2526, async () => {
  await connect();
  console.log("Hello buddy I am listening on port 2526!");
});
