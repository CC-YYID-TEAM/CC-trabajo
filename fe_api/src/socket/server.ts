import { connect, StringCodec, NatsConnection, Codec } from 'nats';
export class Server {
  private nc: NatsConnection;
  private url: string;
  private port: string;
  private sc: Codec<string>;
  /**
   * Constructs a new instance of the class.
   *
   * @param {string} type - The type of the socket.
   * @param {string} url - The URL of the socket.
   */
  constructor(url: string, port: string) {
    this.url = url + ':' + port;
    this.port = port;
    this.sc = StringCodec();
    this.conect();
  }
  private async conect() {
    console.log('Worker connected to port:' + this.port);
    this.nc = await connect({ servers: this.url });
  }

  public listener() {
    this.nc.publish('hello', this.sc.encode('world'));
  }
}
