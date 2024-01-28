
import axios from 'axios';
import * as dotenv from 'dotenv';
import { Client } from './socket/nats';

dotenv.config({ path: '../.env' });
interface WorkerData {
  start?: Date;
  end?: Date;
}
const workerData: WorkerData[]  = [];
const workerInExce: string[]  = [];

async function main(): Promise<void> {
  const NUM_PROCESOS_IN_QUEUE_FOR_OTHER_WORkER=process.env.NUM_PROCESOS_IN_QUEUE_FOR_OTHER_WORkER || '5'
  const HOST_NATS = process.env.NATS_URL || 'localhost'
  const PORT_NATS = process.env.NATS_PORT || '4222'
  console.log("inicializado"+process.env.NATS_URL)
  new Client(HOST_NATS, PORT_NATS,function(num,data){
    const parsedData = JSON.parse(data);
    if(parsedData.message=="start"){
      workerData[parsedData.id]={start:new Date, end:new Date}
      workerInExce.push(parsedData.id);
      console.log(workerInExce.length)
    }
    if(workerInExce.length>parseInt(NUM_PROCESOS_IN_QUEUE_FOR_OTHER_WORkER)){
      console.log("Add worker")
    }
    if(parsedData.message=="end"){
      workerData[parsedData.id].end=new Date;      
      //remove trabajo
      let index = workerInExce.indexOf(parsedData.id); // Find the index of the element you want to remove
      if (index !== -1) {
        workerInExce.splice(index, 1); // Remove 1 element at the found index
        console.log("elimino",parsedData.id,'size queue',workerInExce.length)
      }
      
    }
    
  });
}

main()