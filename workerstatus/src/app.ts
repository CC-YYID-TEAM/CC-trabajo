import { jobStatus } from "./nats/jobStatus"
import * as dotenv from 'dotenv';
function main(){
    dotenv.config({ path: '../.env' });
    const natsHost = process.env.NATS_URL || 'localhost';
    const natsPort = process.env.NATS_PORT || '4222';
    new jobStatus(`nats://${natsHost}`,`${natsPort}`)
    
}
main()