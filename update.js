const fs = require('fs');
const YAML = require("js-yaml");

//Load the YAML
let raw = fs.readFileSync("./config/gateway.config.yml");
let data = YAML.load(raw);

data.serviceEndpoints.httpbin = {url:'http://localhost:9090'};
const yaml = YAML.dump(data);

fs.writeFileSync("./config/gateway.config.yml",yaml,(err,file)=>{
if(err)
console.log(err);
console.log("saved");
})