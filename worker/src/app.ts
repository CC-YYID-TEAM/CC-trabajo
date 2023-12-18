import {Socket} from "./socket/zeromq"
function main(){
    let socket:Socket = new Socket("tcp://127.0.0.1:5555","pull")
}
main()