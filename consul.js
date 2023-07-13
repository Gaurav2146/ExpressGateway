
const express = require('express');
const app = express();
const Consul = require('consul');

const serviceName = 'ONGC-BLOCKCHAIN';
const servicePort = 4000;

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

setInterval(()=>{
  checkStatus();
},5000)


app.get('/health',(req,res,next)=>{
  res.status(200).send("This is Healthy");
})

async function checkStatus()
{
let data = await consulClient.health.checks("ONGC-BLOCKCHAIN");
console.log(data);
}


app.listen(4000,()=>{
console.log("server is listening at port 3000");
})