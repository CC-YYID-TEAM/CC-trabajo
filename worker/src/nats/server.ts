import { connect, NatsConnection, Codec, StringCodec } from 'nats';
import { JetstreamHandler } from './jetStreamHandler';
import { jobStatus } from "./jobStatus"



export class Server {
  private nc: NatsConnection;
  private url: string;
  private port: string;
  private sc: Codec<string>;
  private jetstreamHandler: JetstreamHandler;

  constructor(url: string, port: string) {
    this.url = url + ':' + port;
    this.port = port;
    this.sc = StringCodec();
    this.conect();
    new jobStatus("nats://localhost","4222")

   
  }

  private async conect() {
    console.log('Worker connected to port:' + this.port);
    this.nc = await connect({ servers: this.url });
    this.listener();
    this.jetstreamHandler = new JetstreamHandler(this.nc);

  }

  public async jetstream(id:string,status:string) {
    await this.jetstreamHandler.put(id, status);
    const result = await this.jetstreamHandler.get(id);
    console.log(`status -> ${result}`);
  }

  public async storeTrabajo(id:string,result:string) {

    await this.jetstreamHandler.storeValue(id, result);
    console.log("HAS BEEN STORED SUCCESSFULY");

  }

  private async listener() {
    console.log("hola");
    const sub = this.nc.subscribe('hello', {
      queue: "workers",
      callback: async (_err, _msg) => {
        const trabajo = JSON.parse(this.sc.decode(_msg.data));
        await this.jetstream(trabajo.id,"RECEIVED BY WORKER");
        this.ejecutarFuncion(trabajo);
        
      },
    });
  }

  private async ejecutarFuncion(Trabajo: any) {
    const userFunction = new Function(Trabajo.expression);

    try {
      await this.jetstream(Trabajo.id,"EXEUCTING");
       const result = await userFunction();
      this.storeTrabajo(Trabajo.id,result);
     await this.jetstream(Trabajo.id,"TERMINATED");
    } catch (error) {
      console.error("Error executing user function:", error);
    }
  }

// Usage
}
