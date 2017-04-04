"use strict";

let common = require('../lib/common');
let config = require('../lib/config');

function mungeInstruments(instruments)
{
    return instruments.map(
        i => i.replace(/\//g, "_")
    ).join(",")
}

let argv = require('yargs')
    .alias('config', 'c')
    .nargs('config', 1)
    .describe('config', "v20 Configuration File to use")
    .default('config', config.defaultConfigFile())
    .alias('instrument', 'i')
    .array('instrument')
    .coerce('instrument', mungeInstruments)
    .alias('snapshot', 's')
    .boolean('snapshot')
    .default('snapshot', true)
    .boolean('heartbeat')
    .default('heartbeat', false)
    .help('help')
    .alias('help', "h")
    .argv;

let conf = new config.Config(argv.config);

let ctx = conf.createStreamingContext();

function priceToString(price)
{
    return (
        price.instrument + " " 
        + price.time + " " +
        price.bids[0].price + "/" +
        price.asks[0].price
    );
}

ctx.pricing.stream(
    conf.activeAccount,
    {
        instruments: argv.instrument,
        snapshot: argv.snapshot
    },
    (message) => {
        if (message.type == "HEARTBEAT")
        {
            if (argv.heartbeat) { console.log(message.summary()); }
            return;
        }

        console.log(priceToString(message));
    },
    (response) => {
        console.log(response);
    }
);
