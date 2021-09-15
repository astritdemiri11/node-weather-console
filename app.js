const yargsLib = require('yargs');
const chalkLib = require('chalk');

const geocodeAsync = require('./utils/geocode');
const forecastAsync = require('./utils/forecast');

const displayForecast = ({ location, temperature, observationTime, type }) => { 
    const result = `Forecast in ${location} at ${observationTime}: ${type} and ${temperature} degrees celsius.`;
    console.log(chalkLib.green.inverse(result)) 
};

yargsLib.command({
    command: 'forecast',
    describe: 'Forecast Command',
    builder: {
        location: {
            describe: 'Forecast Location',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => geocodeAsync(argv.location, (error, { latitude, longitude } = { }) => {
        if(error) {
            console.log(chalkLib.red.inverse(error));
            return;
        }

        forecastAsync(latitude, longitude, (error, current) => {
            if(error) {
                console.log(chalkLib.red.inverse(error));
                return;
            }

            displayForecast(current);
        });
    })
});

yargsLib.parse();