const query = require('querystring');
const request = require('request');
const _  = require('lodash');

const apiUrl = 'https://maps.googleapis.com/maps/api/distancematrix/json?'

const joinArray = (arr) => {
    return arr.join('|');
}

const formatOptions = options => {
    return {
        key: options.key,
        client: options.client || null,
        signature: options.signature || null,
        origins: joinArray(options.origins),
        destinations: joinArray(options.destinations), //array
        mode: options.mode || 'driving', //driving, walking, bicycling, transit
        language: options.language || 'en',
        avoid: options.avoid || null,
        units: options.units || 'metric', //metric, imperial
        arrival_time: options.arrival_time || null, //omitting arrival_time and departure_time defaults departure_time to now.
        departure_time: options.departure_time || 'now',
        traffic_model: options.traffic_model || 'optimistic', //best_guess, pessimistic, optimistic
        transit_mode: options.transit_mode || null, //bus, subway, train, tram, rail
        transit_routing_preference: options.transit_routing_preference || null //less_walking, fewer_transfers
    }
};

const createResultRow = (result, origin, destination) => {

    return {
        origin,
        destination,
        distance: result.distance.text,
        distanceValue: result.distance.value,
        duration: result.duration.text,
        durationValue: result.duration.value,

        mode: result.mode,
        units: result.units,
        language: result.language,
        avoid: result.avoid
    }
};

const transformData = (data, callback) => {
    const results = [];
    for(let oAddr = 0; oAddr < data.origin_addresses.length; oAddr++ ) {
        for(let dAddr = 0; dAddr < data.destination_addresses.length; dAddr++) {
            const origin = data.origin_addresses[oAddr];
            const dest = data.destination_addresses[dAddr];
            const result = data.rows[oAddr].elements[dAddr];
            results.push(createResultRow(result, origin, dest));
        }
    }
    callback(null, results)
}

const requestResponse = (options, callback) => {
    if (!options.origins || options.origins.length === 0) {
        return callback({error: 'No Origin Specified.'});
    }
    if (!options.destinations || options.destinations.length === 0) {
        return callback({error: 'Destinations missing'});
    }
    request(`${apiUrl}${query.stringify(_.omitBy(options, _.isNil))}`, (err, res, body) => {
        const ret = JSON.parse(body);
        if (err || ret.status !== 'OK') {
            return callback(new Error(`Error requesting data: ${body}`), {});
        }

        transformData(ret, callback);
    });
}

const GoogleDistanceApi = function() {
    this.key = '';
    this.client = '';
    this.signature = '';
    this.options = {
        mode: 'driving',
        langugage: 'en',
        units: 'metric',
        traffic_model: 'optimistic'
    }
};


GoogleDistanceApi.prototype.distance = function(options, cb) {

    if(options.key === undefined && (options.client === undefined || options.signature === undefined)) {
        return cb(new Error('No Keys supplied'));
    }

    this.options = formatOptions(options);
    requestResponse(this.options, cb);
};

module.exports = new GoogleDistanceApi();
