
export class Transmitter{
    constructor(socket){
        this.socket = socket || false;
    }

    setSocket = (socket) => {
        this.socket = socket;
    };

    send = (event, data) =>{
        if(!this.socket){
            console.error('no socket available in transmitter');
            return;
        }

        this.socket.send(JSON.stringify({event, data}));
    }
}
