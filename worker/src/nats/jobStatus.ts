import { connect, NatsConnection, Codec, StringCodec } from 'nats';
import express from 'express';
import { JetstreamHandler } from './jetStreamHandler';

export class jobStatus {
  private nc: NatsConnection;
  private url: string;
  private port: string;
  private sc: Codec<string>;
  private jetstreamHandler: JetstreamHandler;
  private app: express.Application;

  constructor(url: string, port: string) {
    this.url = url + ':' + port;
    this.port = port;
    this.sc = StringCodec();
    this.app = express();
    this.connect();
  }

  private async connect() {
    console.log('Status connected to port:' + this.port);
    this.nc = await connect({ servers: this.url });
    this.jetstreamHandler = new JetstreamHandler(this.nc);
    this.setupExpress();
  }

  private setupExpress() {
    this.app.get('/getworkstatus/:workid', async (req, res) => {
      const workId = req.params.workid;
      const { success, result, error } = await this.jetstreamHandler.get(workId);
      
      if (success) {
        res.send(`WorkID: ${workId}, Status: ${result}`);
      } else {
        res.status(500).send(`Error: ${error}`);
      }
    });

    this.app.get('/getworkresult/:workid/:userid', async (req, res) => {
      const workId = req.params.workid;
      const userId = req.params.userid;
    
      const { success, result, error } = await this.jetstreamHandler.getValue(userId, workId);
    
      if (success) {
        res.send(`UserID: ${userId}, WorkID: ${workId}, Result: ${result}`);
      } else {
        res.status(500).send(`Error: ${error}`);
      }
    });
    this.app.get('/getworkresult/:userid', async (req, res) => {
      const userId = req.params.userid;
    
      try {
        const { success, results, error } = await this.jetstreamHandler.getAllUserJobs(userId);
    
        if (success) {
          res.send({ results });
        } else {
          res.status(500).send({ error });
        }
      } catch (err) {
        res.status(500).send({ error: err.message });
      }
    });
    

    this.app.listen(1983, () => {
      console.log('Express server listening on port 3000');
    });
  }
}
