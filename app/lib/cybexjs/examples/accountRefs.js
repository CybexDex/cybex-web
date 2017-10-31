var Apis =  require("cybexjs-ws").Apis;

Apis.instance("ws://127.0.0.1:8090", true).init_promise.then(() => {

    Apis.instance().db_api().exec("get_key_references", [["BTS8eLeqSZZtB1YHdw7KjQxRSRmaKAseCxhUSqaLxUdqvdGpp6nck"]]).then(refs => {
        console.log("refs:", refs);
    });
});
