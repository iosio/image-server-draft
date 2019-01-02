import Socket from "@iosio/websocket-client/lib";


const socket = new Socket({
    websocket: WebSocket,
    websocket_options: null,
    url: "ws://" + window.location.hostname + ":4000",
    auto_reconnect: {every: 2000},
    should_console_log: true,
});

socket.open();

export {socket};