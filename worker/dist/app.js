"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zeromq_1 = require("./socket/zeromq");
function main() {
    let socket = new zeromq_1.Socket("tcp://127.0.0.1:5555", "pull");
}
main();
//# sourceMappingURL=app.js.map