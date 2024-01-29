
import { connect, StringCodec, NatsConnection, Codec, SubscriptionOptions, Subscription } from 'nats';
export class Client {
  private nc: NatsConnection | undefined;
  private url: string;
  private sc: Codec<string>;
  private estadoCola:Function;

  private promedio:Function;
  //  private jetstream:JetstreamHandler;
  /**
   * Constructs a new instance of the class.
   *
   * @param {string} port - port of connect.
   * @param {string} url - The URL of the socket.
   */
  constructor(url: string, port: string, estadoCola: (num:number,data:string) => void, promedio: () => void) {
    this.url = url + ':' + port;
    this.sc = StringCodec();
    this.estadoCola=estadoCola;
    this.promedio=promedio;
    this.conect();
  }
  private async conect() {
    try {
      this.nc = await connect({ servers: this.url });
     this.listener()
     this.getMetricas()
      console.log('observer connected to NATS:' + this.url);
    } catch (error) {
      console.log('Error al conectarse a nats', error);
    }
  }

  private listener() {
    const sub = this.nc!.subscribe("datawork");

    (async () => {
      for await (const m of sub) {
        this.estadoCola(sub!.getProcessed(),this.sc.decode(m.data))
      }
      console.log("subscription closed");
    })();
  }

  private async getMetricas() {
    console.log('getMetricas');
    this.nc!.subscribe("metricas", {
      callback: (_err, msg) => {
        let promedio=this.promedio()
        msg.respond(this.sc.encode(promedio.toString()));
      },
    });
  }
}
