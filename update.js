const fs = require('fs');
const YAML = require("js-yaml");


module.exports = { updateGatewayFile };

function updateGatewayFile(serverStatusDetails) {
    try {
        console.log(serverStatusDetails, "serverStatusDetails");

        let orderServer = [];
        let paymentServer = [];

        if (serverStatusDetails.has("orderServer1")) {
            orderServer.push(serverStatusDetails.get("orderServer1"))
        }
        if (serverStatusDetails.has("orderServer2")) {
            orderServer.push(serverStatusDetails.get("orderServer2"))
        }
        if (serverStatusDetails.has("paymentServer1")) {
            paymentServer.push(serverStatusDetails.get("paymentServer1"))
        }
        if (serverStatusDetails.has("paymentServer2")) {
            paymentServer.push(serverStatusDetails.get("paymentServer2"))
        }

        //Load the YAML
        let raw = fs.readFileSync("./config/gateway.config.yml");
        let data = YAML.load(raw);

        if (orderServer.length > 0 && paymentServer.length > 0) {

            data.serviceEndpoints.orderService = { urls: orderServer };
            data.serviceEndpoints.paymentService = { urls: paymentServer };
            const yaml = YAML.dump(data);

            fs.writeFileSync("./config/gateway.config.yml", yaml, (err, file) => {
                if (err)
                    console.log(err);
                console.log("saved");
            })
        }
    } catch (error) {
        console.log(error);
    }
}
