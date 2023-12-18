import * as zmq from "zeromq"
 export class Socket {
    private socket:zmq.socket
    /**
        * Constructs a new instance of the class.
        *
        * @param {string} type - The type of the socket.
        * @param {string} url - The URL of the socket.
    */
    constructor(url:string,type:string,){
        this.socket=zmq.socket(type)
        this.conect(url)
        this.sendMessage()
    }
    private conect(url:string) {
        console.log("Worker connected to port 3000");
        this.socket.bindSync(url);
    }

    public sendMessage(){
        this.socket.send("some work");
    }

 }

