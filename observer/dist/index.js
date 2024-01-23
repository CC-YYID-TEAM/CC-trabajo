"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hello = void 0;
const world = 'world';
function hello(who = world) {
    console.log("hh");
    return `Hello ${who}! `;
}
exports.hello = hello;
hello("finally");
/*import http from 'http';
import axios from 'axios';
import url from 'url';
import crypto from 'crypto';

interface WorkerData {
  start?: Date;
  end?: Date;
}

const workerData: { [key: string]: WorkerData } = {};

async function main(): Promise<void> {
  setInterval(async () => {
    const resp = await axios.get('http://localhost:8222/varz');
    console.log(resp.data.in_msgs);
    if (resp.data.in_msgs > 10) {
      console.log('Debería añadir nuevo worker');
      workerData[crypto.randomUUID()] = { start: undefined, end: new Date() };
    }
  }, 20000);

  setInterval(async () => {
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
    const q = url.parse(req.url? , true);
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
  }).listen(8080);
}

main() */ 
//# sourceMappingURL=index.js.map