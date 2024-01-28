"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const nats_1 = require("./socket/nats");
dotenv.config({ path: '../.env' });
const workerData = [];
const workerInExce = [];
async function main() {
    const NUM_PROCESOS_IN_QUEUE_FOR_OTHER_WORkER = process.env.NUM_PROCESOS_IN_QUEUE_FOR_OTHER_WORkER || '5';
    const HOST_NATS = process.env.NATS_URL || 'localhost';
    const PORT_NATS = process.env.NATS_PORT || '4222';
    console.log("inicializado" + process.env.NATS_URL);
    new nats_1.Client(HOST_NATS, PORT_NATS, function (num, data) {
        const parsedData = JSON.parse(data);
        if (parsedData.message == "start") {
            workerData[parsedData.id] = { start: new Date, end: new Date };
            workerInExce.push(parsedData.id);
            console.log(workerInExce.length);
        }
        if (workerInExce.length > parseInt(NUM_PROCESOS_IN_QUEUE_FOR_OTHER_WORkER)) {
            console.log("Add worker");
        }
        if (parsedData.message == "end") {
            workerData[parsedData.id].end = new Date;
            //remove trabajo
            let index = workerInExce.indexOf(parsedData.id); // Find the index of the element you want to remove
            if (index !== -1) {
                workerInExce.splice(index, 1); // Remove 1 element at the found index
                console.log("elimino", parsedData.id, 'size queue', workerInExce.length);
            }
        }
    });
}
main();
