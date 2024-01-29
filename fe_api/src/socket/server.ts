import { connect, StringCodec, NatsConnection, Codec } from 'nats';
import { sendWorkDto } from '../job/dto/sendWork';
export class Server {
  private nc: NatsConnection;
  private url: string;
  private port: string;
  private sc: Codec<string>;
  //  private jetstream:JetstreamHandler;
  /**
   * Constructs a new instance of the class.
   *
   * @param {string} port - port of connect.
   * @param {string} url - The URL of the socket.
   */
  constructor(url: string, port: string) {
    this.url = url + ':' + port;
    this.port = port;
    this.sc = StringCodec();
    this.conect();
  }
  private async conect() {
    try {
      this.nc = await connect({ servers: this.url });
      console.log('Worker connected to port:' + this.port);
    } catch (error) {
      console.log('Error al conectarse a nats', error);
    }
  }

  public listener(sendowrk: sendWorkDto) {
    console.log('envio data');
    this.nc.publish(
      'datawork',
      this.sc.encode(JSON.stringify({ message: 'start', id: sendowrk.id })),
    );
    this.nc.publish('work', this.sc.encode(JSON.stringify(sendowrk)));
  }

  public async getMetricas() {
    console.log('getMetricas');
    const r = await this.nc.request('metricas');
    console.log(this.sc.decode(r.data));
    return this.sc.decode(r.data);
  }
}
