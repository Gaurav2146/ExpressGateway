
const express = require('express');
const app = express();
const Consul = require('consul');

const consulClient = new Consul({ host: 'localhost' });

setInterval(()=>{
    console.log("============================================================");
    checkpaymentServer1Status();
    checkorderServer1Status();
    checkorderServer2Status();
    checkpaymentServer2Status();
    console.log("============================================================");
},10000)

async function checkpaymentServer1Status()
{
let data = await consulClient.health.checks("paymentServer1");
if(data && data.length > 0)
{
    console.log(data[0].Status," paymentServer1");
}

}

async function checkorderServer1Status()
{
let data = await consulClient.health.checks("orderServer1");
if(data && data.length > 0)
{
    console.log(data[0].Status," orderServer1");
}
}

async function checkorderServer2Status()
{
let data = await consulClient.health.checks("orderServer2");
if(data && data.length > 0)
{
    console.log(data[0].Status," orderServer2");
}
}

async function checkpaymentServer2Status()
{
let data = await consulClient.health.checks("paymentServer2");
if(data && data.length > 0)
{
    console.log(data[0].Status," paymentServer2");
}
}


app.listen(7000,()=>{
console.log("check server status server is listening at port 7000");
})