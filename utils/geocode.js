const requestLib = require('request');

const geocodeAsync = (location, callback) => {
    const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1IjoiYXN0cml0ZGVtaXJpMTEiLCJhIjoiY2tzaGxvbXVqMXBtdjJ2cDI5MW5tcHQ2biJ9.ZaQxhm_FyY9qoFAU_XD_tA&limit=1`;

    requestLib(geoUrl, { json: true }, (error, { body: data }) => {
        if (error) {
            return callback('Unable to connect to the Location Service!!!', undefined);
        }

        if (!data || data.features && !data.features.length) {
            return callback('Unable to find location!!!', undefined);
        }

        const place = data.features[0];

        callback(null, { 
            location: place.place_name,
            latitude: place.center[1],
            longitude: place.center[0]
         });
    }); 
};

module.exports = geocodeAsync;