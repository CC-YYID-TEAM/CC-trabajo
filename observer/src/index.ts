
import axios from 'axios';
import * as dotenv from 'dotenv';
import { Client } from './socket/nats';

dotenv.config({ path: '../.env' });
interface WorkerData {
  start: Date;
  end: Date;
}

const workerData: Record<string, WorkerData> = {};
const workerInExce: string[]  = [];

// Función para calcular la media de la diferencia end-start
function calcularMediaDiferencia(): number {
  // Verificar si el array está vacío
  let tamano: number = Object.keys(workerData).length;
  if (tamano === 0) {
      return 0; // Retorna 0 si el array está vacío para evitar división por cero
  }

  let sumaDiferencias = 0;

  // Iterar sobre cada objeto en el array
  for (let key in workerData) {
      // Calcular la diferencia entre end y start
      const diferencia = workerData[key].end.getTime() - workerData[key].start.getTime();
      sumaDiferencias += diferencia;
  }

  // Calcular la media dividiendo la suma total por la cantidad de objetos
  const media = sumaDiferencias / tamano;

  return media;
}


function estadoCola(num:number,data:string){
  const NUM_PROCESOS_IN_QUEUE_FOR_OTHER_WORkER=process.env.NUM_PROCESOS_IN_QUEUE_FOR_OTHER_WORkER || '5'
  const parsedData = JSON.parse(data);

  if(parsedData.message=="start"){
    workerData[parsedData.id]={start:new Date, end:new Date}
    workerInExce.push(parsedData.id);
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
}
async function main(): Promise<void> {
  const HOST_NATS = process.env.NATS_URL || 'localhost'
  const PORT_NATS = process.env.NATS_PORT || '4222'
  console.log("inicializado"+process.env.NATS_URL)
  new Client(HOST_NATS, PORT_NATS, estadoCola, calcularMediaDiferencia
  );
}

main()