
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config({ path: '../.env' });
interface WorkerData {
  start?: Date;
  end?: Date;
}

const workerData: { [key: string]: WorkerData } = {};

async function main(): Promise<void> {
  const NUM_PROCESOS_IN_QUEUE_FOR_OTHER_WORkER=process.env.NUM_PROCESOS_IN_QUEUE_FOR_OTHER_WORkER || '5'
  console.log("inicializado"+process.env.NATS_URL)
  setInterval(async () => {
    try {
      const resp = await axios.get(`http://${process.env.NATS_URL}:${process.env.NATS_PORT}/varz`);
     // console.log("here");
      console.log(resp.data.in_msgs);
      if (resp.data.in_msgs > parseInt(NUM_PROCESOS_IN_QUEUE_FOR_OTHER_WORkER)) {
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