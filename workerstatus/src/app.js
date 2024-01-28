"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("./nats/jobStatus");
function main() {
    new server_1.jobStatus("nats://localhost", "4222");
}
main();
