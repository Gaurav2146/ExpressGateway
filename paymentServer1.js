
const express = require('express');
const app = express();
const Consul = require('consul');

const serviceName = 'paymentServer1';
const servicePort = 6000;

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

app.get('/health', (req, res, next) => {
  res.status(200).send("This is Healthy");
})

app.get('/payment', (req, res, next) => {
  res.status(200).send("Get All payment successfully from paymentServer1");
})

app.listen(6000, () => {
  console.log("server is listening at port 6000");
})