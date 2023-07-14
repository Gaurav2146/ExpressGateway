
const express = require('express');
const app = express();
const Consul = require('consul');

const serviceName = 'orderServer1';
const servicePort = 3000;

const consulClient = new Consul({ host: 'localhost' });

consulClient.agent.service.register({
  name: serviceName,
  port: servicePort,
  check: {
    http: `http://localhost:${servicePort}/health`,
    interval: '10s',
  }
}, () => {
  console.log(`Service ${serviceName} registered`);
});

// setInterval(()=>{
//   checkStatus();
// },5000)


app.get('/health', (req, res, next) => {
  res.status(200).send("This is Healthy");
})

app.get('/order', (req, res, next) => {
  res.status(200).send("Get All orders successfully from orderServer1");
})

async function checkStatus() {
  let data = await consulClient.health.checks("orderServer1");
  console.log(data);
}

app.listen(3000, () => {
  console.log("server is listening at port 3000");
})