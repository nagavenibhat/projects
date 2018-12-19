const NodeGeocoder = require('node-geocoder');
const config = require(__dirname + '/config.json');
const mongo = require(__dirname + '/mongo.js');

let options = {
    provider: 'google',
    httpAdapter: 'https',
    apiKey: config.apiKey,
    formatter: 'json'
};

let geocoder = NodeGeocoder(options);
module.exports.geoFinder = function(address,response) {
    geocoder.geocode(address, function(err, body) {
	let data;
        if (err) {
            console.log(err);
            response.render('index', {
                error: 'Error, please try again',
                result: null
            });
            data.error = err;
        } else {
            data = body[0];
            data.query = address;
            if (data.latitude == undefined || data.longitude == undefined) {
                data.status = 'failure';
                response.render('index', {
                    error: 'Error, please try again',
                    result: null
                });
            } else {
                data.status = 'success';
                let resultText = `Search Query :  ${address}  \n Resulting Longitude is  ${data.longitude} and Latitude is ${data.latitude}!`;
                response.render('index', {
                    result: resultText,
                    error: null
                });
            }
        }
        mongo.insert(data);
    });
}