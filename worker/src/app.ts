import {Server} from "./nats/server"
import { jobStatus } from "./nats/jobStatus"
function main(){
    new Server("nats://localhost","4222")

}
main()