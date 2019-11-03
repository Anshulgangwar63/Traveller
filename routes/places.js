const request = require('request');

_EXTERNAL_URL = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=new+york+city+tourist+attraction&key=AIzaSyBU4nA8iRi8kcydsY9WMS_PmkMndtkSM-8';

const callExternalApiUsingRequest = (callback) => {
    request(_EXTERNAL_URL, { json: true }, (err, res, body) => {
    if (err) { 
        return callback(err);
     }
    return callback(body);
    });
}

module.exports.callApi = callExternalApiUsingRequest;