import { connect, NatsConnection, Codec, StringCodec } from 'nats';
import { JetstreamHandler } from './jetStreamHandler';




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


   
  }

  private async conect() {
    console.log('Worker connected to port:' + this.port);
    this.nc = await connect({ servers: this.url });
    this.listener();
    this.jetstreamHandler = new JetstreamHandler(this.nc);

  }

  public async jetstream(id:string,status:string) {
    await this.jetstreamHandler.put(id, status);
    console.log("status stored ")
  }

  public async storeTrabajo(userid:string,id:string,result:string) {

    await this.jetstreamHandler.storeValue(userid,id, result);
    console.log("HAS BEEN STORED SUCCESSFULY");

  }

  private async listener() {
    const sub = this.nc.subscribe('hello', {
      queue: "workers",
      callback: async (_err, _msg) => {
        const trabajo = JSON.parse(this.sc.decode(_msg.data));
        await this.jetstream(trabajo.id,"RECEIVED BY WORKER");
       // await this.example();
        console.log("before work")
        this.ejecutarFuncion(trabajo);
        
      },
    });
  }

  private async ejecutarFuncion(Trabajo: any) {

    try {
      const userFunction = await eval(Trabajo.expression);
      await this.jetstream(Trabajo.id,"EXEUCTING");
      this.storeTrabajo(Trabajo.userid,Trabajo.id,userFunction);
     await this.jetstream(Trabajo.id,"TERMINATED");
    } catch (error) {
      console.error("Error executing user function:", error);
    }
  }


  sleep(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  // Usage:
  async example() {
    console.log('Start');
    await this.sleep(30000); // Sleep for 10 seconds
    console.log('End');
  }
  
  
}
