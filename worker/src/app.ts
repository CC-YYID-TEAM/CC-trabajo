import {Socket} from "./socket/zeromq"
function main(){
    new Socket("tcp://127.0.0.1:5555","pull")
}
main()