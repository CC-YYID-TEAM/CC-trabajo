"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const workerData = {};
async function main() {
    console.log("inicializado");
    setInterval(async () => {
        let resp;
        try {
            const resp = await axios_1.default.get('http://localhost:8222/varz');
            console.log("here");
            console.log(resp.data.in_msgs);
            if (resp.data.in_msgs > 10) {
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
