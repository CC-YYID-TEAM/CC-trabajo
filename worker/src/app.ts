import {Server} from "./nats/server"
function main(){
    new Server("demo.nats.io","5555")
}
main()