export const validateRequest = (req, routes) => {


    let err_msg;


    if (!req) {

        err_msg = 'invalid request data in validator';

        // console.error(err_msg);

        return {
            ok: false,
            err_msg,
            data: false,
        };

    }

    if (typeof req !== 'string') {

        err_msg = 'request data must be of type string';

        return {
            ok: false,
            err_msg,
            data: false,
        };
    } else {

        let ok = true;

        let data = {};


        try {
            data = JSON.parse(req);
        } catch (e) {
            ok = false;
            err_msg = e.message;
        }


        if (!ok) {

            err_msg = 'error parsing data:' + err_msg;

            return {
                ok: false,
                err_msg,
                data: false,
            };

        } else if (!data.event) {

            err_msg = 'missing event property';

            // console.error(err_msg);

            return {
                ok: false,
                err_msg,
                data: false,
            };

        } else if (!routes[data.event]) {

            err_msg = 'no matching event type ' + data.event;

            // console.error(err_msg);

            return {
                ok: false,
                err_msg,
                data: false,
            };

        } else {

            return {
                ok: true,
                err_msg: false,
                data,
            };
        }
    }


};
