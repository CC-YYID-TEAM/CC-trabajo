"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./nats/server");
function main() {
    new server_1.Server("demo.nats.io", "5555");
}
main();
//# sourceMappingURL=app.js.map