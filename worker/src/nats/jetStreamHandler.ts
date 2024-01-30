import { NatsConnection, StringCodec, Codec, JetStreamClient } from 'nats';

export class JetstreamHandler {
  private nc: NatsConnection;
  private sc: Codec<string>;

  constructor(nc: NatsConnection) {
    this.nc = nc;
    this.sc = StringCodec();
  }

  private getJetstream(): JetStreamClient {
    return this.nc.jetstream();
  }

  private async getKeyValueView(viewName: string) {
    const js = this.getJetstream();
    return await js.views.kv(viewName);
  }

  public async put(key: string, value: string): Promise<{ success: boolean, error?: string }> {
    try {
      const kv = await this.getKeyValueView("jobs");
      await kv.put(key, value);
      return { success: true };
    } catch (error) {
      console.error('Error putting key-value:', error);
      return { success: false, error: 'Failed to put key-value' };
    }
  }

 

  public async storeValue(userid:string,key: string, value: string): Promise<{ success: boolean, error?: string }> {
    try {
      const os = await this.getJetstream().views.os(userid);
      const data = new TextEncoder().encode(value);
      const info = await os.putBlob({ name: key, description: "large data" }, data);
      console.log(`Added entry ${info.name} (${info.size} bytes) - '${info.description}'`);
      return { success: true };
    } catch (error) {
      console.error('Error storing value:', error);
      return { success: false, error: 'Failed to store value' };
    }
  }

  
   
 
}
