
const express = require("express");
const app = express();

const allCharts = [
  "demo",
  "eth-daliy",
];

app.use("/", express.static(__dirname + "/static"));

app.use(express.json());

/*
require("./func/eth-daliy.js")().then((result) => {
  console.log(result);
}).catch((err) => {
  console.error(err);
});
*/

for (let chart of allCharts) {
  const func = require(`./func/${chart}.js`);
  app.post(`/${chart}`, (req, res) => {
    try {
      func(req.body).then((result) => {
        res.end(JSON.stringify(result));
      }).catch((err) => {
        console.error(err);
        res.end(JSON.stringify({error: "查询错误"}));
      })
    } catch (error) {
      console.error(error);
      res.end(JSON.stringify({error: "服务器异常"}));
    }
  });
}

app.listen(8888);
