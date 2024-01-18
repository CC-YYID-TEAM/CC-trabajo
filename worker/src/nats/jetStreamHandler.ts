import { connect, NatsConnection, Codec, StringCodec } from 'nats';

export class JetstreamHandler {
  private nc: NatsConnection;
  private sc: Codec<string>;

  constructor(nc: NatsConnection) {
    this.nc = nc;
    this.sc = StringCodec();
  }

  public async put(key: string, value: string): Promise<void> {
    const js = this.nc.jetstream();
    const kv = await js.views.kv("jobs");
    await kv.put(key, value);
  }



  public async get(key: string): Promise<string | undefined> {
    const js = this.nc.jetstream();
    const kv = await js.views.kv("jobs");
    const entry = await kv.get(key);
    return entry?.string();
  }

}
