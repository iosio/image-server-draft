import {validateRequest} from "./reqValidation";


export const router = (socket, routes, req) => {

    let err;

    if (!socket) {
        err = 'no socket provided to the router';
        console.log(err);
        return;
    }

    let {ok, err_msg, data} = validateRequest(req, routes);





    if (!ok) {
        console.log('\n ok:', ok, '\n err_msg: ', err_msg, '\n data: ', data);

        socket.send(JSON.stringify({
            data: {error: err_msg},
            event: 'server_error'
        }));
        return;

    }else{
        console.log('request is validated');
    }
    // console.log(data.event);


    let controller = false, respond_to = false;

    if (routes[data.event] && (typeof routes[data.event] === 'function')) {
        controller = routes[data.event]
    } else if (routes[data.event].controller) {
        controller = routes[data.event].controller;
    }

    if (routes[data.event] && routes[data.event].respond_to) {
        respond_to = routes[data.event].respond_to
    }

    if (!controller) {

        err_msg = 'no controller provided for this event';

        console.error(err_msg);

        socket.send(JSON.stringify({
            data: {error: err_msg},
            event: 'server_error'
        }));
        return;
    }


    // console.log('dataaaaaa', data);
    if ((data.data && data.type && data.type === 'request') && data.response_id) {
        respond_to = data.response_id;
    }

    //perform the logic and stringify the response
    controller(data, (resp) => {

        if (!respond_to) {

            console.error('no respond_to provided');

        } else {
            console.log('responding to request');

            socket.send(JSON.stringify({

                event: respond_to, //the event type the client will check for
                data: resp

            }));

        }

    });


};
