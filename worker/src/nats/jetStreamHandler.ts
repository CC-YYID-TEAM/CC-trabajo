import { NatsConnection, JetStreamManager, StringCodec, Codec, JetStreamClient } from 'nats';

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

  public async get(key: string): Promise<{ success: boolean, result?: string, error?: string }> {
    try {
      const kv = await this.getKeyValueView("jobs");
      const entry = await kv.get(key);
      return { success: true, result: entry?.string() };
    } catch (error) {
      console.error('Error getting value:', error);
      return { success: false, error: 'Failed to get value' };
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

  public async getValue(userid:string,key: string): Promise<{ success: boolean, result?: string, error?: string }> {
    try {
      const os = await this.getJetstream().views.os(userid);
      const data = await os.getBlob(key);
      return { success: true, result: new TextDecoder().decode(data) };
    } catch (error) {
      console.error('Error getting value:', error);
      return { success: false, error: 'Failed to get value' };
    }
  }
   
  public async getAllUserJobs(userid:string): Promise<{ success: boolean, results?:Array<{ name: string, data: string }>, error?: string }> {
    try {
      const os = await this.getJetstream().views.os(userid);
      const allBlobs = await  os.list();
      const result = [];

      for (const blobItem of allBlobs) {
        const blobName = blobItem.name;
        const blobData = await new TextDecoder().decode(await os.getBlob(blobName));
    
        const jsonItem = {
          Id: blobName,
          Result: blobData
        };
    
        result.push(jsonItem);
      }
      return { success: true, results: result };
    } catch (error) {
      console.error('Error getting value:', error);
      return { success: false, error: 'Failed to get value' };
    }
  }
}

