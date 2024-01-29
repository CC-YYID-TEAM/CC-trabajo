import { connect, NatsConnection, Codec, StringCodec } from 'nats';
import { JetstreamHandler } from './jetStreamHandler';
import { jobStatus } from "./jobStatus"
import { ejecutarScriptShell } from './util';




export class Server {
  private nc!: NatsConnection;
  private url: string;
  private port: string;
  private sc: Codec<string>;
  private jetstreamHandler!: JetstreamHandler;

  constructor(url: string, port: string) {
    this.url = url + ':' + port;
    this.port = port;
    this.sc = StringCodec();
    this.conect();
    console.log('Worker connected to port hh:' + this.port);
    new jobStatus(url,port)

   
  }

  private async conect() {
    console.log('Worker connected to port:' + this.port);
    try {
      this.nc = await connect({ servers: this.url });
      this.listener();
    } catch (error) {
      console.log(error);
    }
    
    
    this.jetstreamHandler = new JetstreamHandler(this.nc);

  }

  public async jetstream(id:string,status:string) {
    await this.jetstreamHandler.put(id, status);
    const result = await this.jetstreamHandler.get(id);
    console.log(`status -> ${result}`);
  }

  public async storeTrabajo(userid:string,id:string,result:string) {

    await this.jetstreamHandler.storeValue(userid,id, result);
    console.log("HAS BEEN STORED SUCCESSFULY");

  }

  private async listener() {
    console.log("hola");
    const sub = this.nc.subscribe('work', {
      queue: "workers",
      callback: async (_err, _msg) => {
        const trabajo = JSON.parse(this.sc.decode(_msg.data));
        await this.jetstream(trabajo.id,"RECEIVED BY WORKER");
        //await this.example();
        console.log("before work")
        this.ejecutarFuncion(trabajo);
        
      },
    });
  }

  private async ejecutarFuncion(Trabajo: any) {
    let result;

    try {
      //const result = await eval(Trabajo.expression);
      //Emepzar la ejecucion
      await this.jetstream(Trabajo.id,"EXEUCTING"); 
      const urlGitHub = 'https://github.com/dvaldaliso/workPython.git'; // Reemplazar con la URL real
      await ejecutarScriptShell(urlGitHub)
      .then((resultado: string) => {
        //Imprime resultado
        result=resultado
      })
      .catch((error: Error) => {
        result=error.message
          console.error('Error:', error);
      });    
       //const result = await userFunction();
      
    } catch (error) {
      result = 'Error executing user function:'
      console.error("Error executing user function:", error);
    }

    if (!result){
      result = 'Error executing user function:'
    }
    console.log('Resultado del script de shell:', result);
    // guardar el resultado
    this.storeTrabajo(Trabajo.userid,Trabajo.id, result);
    // avisar al observer que termino
    this.nc.publish(
      'datawork',
      this.sc.encode(JSON.stringify({ message: 'end', id: Trabajo.id })),
    ); 
    await this.jetstream(Trabajo.id,"TERMINATED");

  }


  sleep(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  // Usage:
  async example() {
    console.log('Start');
    await this.sleep(10000); // Sleep for 10 seconds
    console.log('End');
  }
  
  
}
