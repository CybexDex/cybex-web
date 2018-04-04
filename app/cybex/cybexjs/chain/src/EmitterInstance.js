// import ee from "event-emitter";
let ee = require('event-emitter');
var _emitter;
export default function emitter () {
    if ( !_emitter ) {
        _emitter = ee({});
    }
    return _emitter;
}
