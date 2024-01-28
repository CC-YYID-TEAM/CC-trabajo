
import { connect, StringCodec, NatsConnection, Codec, SubscriptionOptions, Subscription } from 'nats';
export class Client {
  private nc: NatsConnection | undefined;
  private url: string;
  private sc: Codec<string>;
  private function:Function;
  //  private jetstream:JetstreamHandler;
  /**
   * Constructs a new instance of the class.
   *
   * @param {string} port - port of connect.
   * @param {string} url - The URL of the socket.
   */
  constructor(url: string, port: string, callback: (num:number,data:string) => any) {
    this.url = url + ':' + port;
    this.sc = StringCodec();
    this.function=callback;
    this.conect();
  }
  private async conect() {
    try {
      this.nc = await connect({ servers: this.url });
     this.listener()
      console.log('observer connected to NATS:' + this.url);
    } catch (error) {
      console.log('Error al conectarse a nats', error);
    }
  }

  private listener() {
    const sub = this.nc!.subscribe("datawork");

    (async () => {
      for await (const m of sub) {
        this.function(sub!.getProcessed(),this.sc.decode(m.data))
      }
      console.log("subscription closed");
    })();
  }
}
