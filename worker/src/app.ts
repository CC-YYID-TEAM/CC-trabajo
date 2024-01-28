import { Server } from "./nats/server"
function main(){
    new Server("nats://localhost","4222")
}
main()