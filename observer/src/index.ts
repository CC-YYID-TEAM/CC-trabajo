
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config({ path: '../.env' });
interface WorkerData {
  start?: Date;
  end?: Date;
}

const workerData: { [key: string]: WorkerData } = {};

async function main(): Promise<void> {
  console.log("inicializado"+process.env.NATS_URL)
  setInterval(async () => {
    let resp;
    try {
      const resp = await axios.get(`http://${process.env.NATS_URL}:${process.env.NATS_PORT}/varz`);
      console.log("here");
      console.log(resp.data.in_msgs);
      if (resp.data.in_msgs > 10) {
        console.log('Adicionar nuevo worker');
      //workerData[crypto.randomUUID()] = { start: undefined, end: new Date() };
      }else{
        console.log("no hay nada")
      }
    } catch (error) {
      console.log(error)
    }
    
    
  }, 2000);
}

main()