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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: '../.env' });
const workerData = {};
async function main() {
    const NUM_PROCESOS_IN_QUEUE_FOR_OTHER_WORkER = process.env.NUM_PROCESOS_IN_QUEUE_FOR_OTHER_WORkER || '5';
    console.log("inicializado" + process.env.NATS_URL);
    setInterval(async () => {
        try {
            const resp = await axios_1.default.get(`http://${process.env.NATS_URL}:${process.env.NATS_PORT}/varz`);
            // console.log("here");
            //console.log(resp.data.in_msgs);
            if (resp.data.in_msgs > parseInt(NUM_PROCESOS_IN_QUEUE_FOR_OTHER_WORkER)) {
                console.log('Adicionar nuevo worker');
                //workerData[crypto.randomUUID()] = { start: undefined, end: new Date() };
            }
            else {
                console.log("no hay nada");
            }
        }
        catch (error) {
            console.log(error);
        }
    }, 2000);
}
main();
