import { connect, NatsConnection, Codec, StringCodec } from 'nats';
import { JetstreamHandler } from './jetStreamHandler';



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

  private async listener() {
    console.log("hola");
    const sub = this.nc.subscribe('hello', {
      queue: "workers",
      callback: async (_err, _msg) => {
        await this.jetstream("1","RECEIVED BY WORKER");
        this.ejecutarFuncion(JSON.parse(this.sc.decode(_msg.data)));
        
      },
    });
  }

  private async ejecutarFuncion(Trabajo: any) {
    const userFunction = new Function(Trabajo.expression);

    try {
      await this.jetstream("1","EXEUCTING");
      for (let i = 0;i< 1000;i++) console.log(i);
       const result = userFunction();
      console.log("work received");
     await this.jetstream("1","TERMINATED");
    } catch (error) {
      console.error("Error executing user function:", error);
    }
  }

// Usage
}
