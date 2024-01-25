"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("./nats/server");
function main() {
    new server_1.Server("nats://localhost", "4222");
}
main();
