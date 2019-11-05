const request = require('request');

<<<<<<< HEAD
_EXTERNAL_URL = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=new+york+city+tourist+attraction&key=AIzaSyBPs_dngIi8gbvWQ8e6QxAobhcY-PHqMFw';
=======
_EXTERNAL_URL = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=new+york+city+tourist+attraction&key=YOUR_API_KEY';
>>>>>>> df0ca689b71cd090bdafe9b27bcbdb215c4771e3

const callExternalApiUsingRequest = (callback) => {
    request(_EXTERNAL_URL, { json: true }, (err, res, body) => {
    if (err) { 
        return callback(err);
     }
    return callback(body);
    });
}

module.exports.callApi = callExternalApiUsingRequest;
