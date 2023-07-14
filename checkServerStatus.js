
const express = require('express');
const app = express();
const Consul = require('consul');
const update = require('./update');

const consulClient = new Consul({ host: 'localhost' });

let serverStatusDetails = new Map();

setInterval(() => {
    console.log("============================================================");
    checkpaymentServer1Status();
    checkorderServer1Status();
    checkorderServer2Status();
    checkpaymentServer2Status();
    update.updateGatewayFile(serverStatusDetails);
    console.log("============================================================");
}, 10000)

async function checkpaymentServer1Status() {
    let data = await consulClient.health.checks("paymentServer1");
    if (data && data.length > 0) {
        if (data[0].Status == "passing") {
            serverStatusDetails.set("paymentServer1", "http://localhost:6000");
        } else if (data[0].Status == "critical") {
            serverStatusDetails.delete("paymentServer1");
        }
    }

}

async function checkorderServer1Status() {
    let data = await consulClient.health.checks("orderServer1");
    if (data && data.length > 0) {
        if (data[0].Status == "passing") {
            serverStatusDetails.set("orderServer1", "http://localhost:3000");
        } else if (data[0].Status == "critical") {
            serverStatusDetails.delete("orderServer1");
        }
    }
}

async function checkorderServer2Status() {
    let data = await consulClient.health.checks("orderServer2");
    if (data && data.length > 0) {
        if (data[0].Status == "passing") {
            serverStatusDetails.set("orderServer2", "http://localhost:5000");

        } else if (data[0].Status == "critical") {
            serverStatusDetails.delete("orderServer2");
        }
    }
}

async function checkpaymentServer2Status() {
    let data = await consulClient.health.checks("paymentServer2");
    if (data && data.length > 0) {
        if (data[0].Status == "passing") {
            serverStatusDetails.set("paymentServer2", "http://localhost:4000");
        } else if (data[0].Status == "critical") {
            serverStatusDetails.delete("paymentServer2");
        }
    }
}


app.listen(7000, () => {
    console.log("check server status server is listening at port 7000");
})