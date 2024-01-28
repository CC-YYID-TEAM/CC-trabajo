import { jobStatus } from "./nats/jobStatus"
function main(){
    new jobStatus("nats://localhost","4222")
    
}
main()