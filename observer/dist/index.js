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
        }
        catch (error) {
            console.log(error);
        }
        /*if (resp.data.in_msgs > 1) {
          console.log('Debería añadir nuevo worker');
          workerData[crypto.randomUUID()] = { start: undefined, end: new Date() };
        }else{
          console.log("no hay nada")
        }*/
    }, 2000);
    /*setInterval(async () => {
      const currDate = new Date();
      Object.keys(workerData).forEach((key) => {
        if (!workerData[key].start && workerData[key].end) {
          let timeDiff = workerData[key].end.getTime() - currDate.getTime();
          timeDiff = 1000;
          if (timeDiff > 120) {
            console.log(`Deberia borrar servidor ${key}`);
            delete workerData[key];
          }
        }
      });
    }, 30000);
  
    http.createServer(function (req, res) {
      const q = url.parse(req.url , true);
      console.log(q.pathname);
      console.log(q.query);
      switch (req.url) {
        case '/register':
          workerData[q.query.id] = undefined;
          break;
        case '/start':
          workerData[q.query.id] = { start: new Date(), end: undefined };
          break;
        case '/end':
          workerData[q.query.id] = { start: undefined, end: new Date() };
      }
      res.end();
    }).listen(8080);*/
}
main();
//# sourceMappingURL=index.js.map