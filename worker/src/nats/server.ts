import { connect, StringCodec, NatsConnection, Codec, ErrorCode } from 'nats';
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
    this.listener();
  }

  private listener() {
    console.log("hola");
    const sub = this.nc.subscribe('hello', {
      queue: "workers",
      callback: (_err, _msg) => {
        this.ejecutarFuncion(JSON.parse(this.sc.decode(_msg.data)));
      },
  });
    
  }

  private ejecutarFuncion( Trabajo:any) {

    const userFunction = new Function(Trabajo.expression)

    try {
     // console.log(Trabajo.expression)
      const result = userFunction();
      console.log("work received");
      //console.log(`The user ${Trabajo.name}" has executed this function ${Trabajo.expression} and the  result is: ${result}`);
  } catch (error) {
    console.log("fuck")
      console.error("Error executing user function:", error);
  }

  }
}

