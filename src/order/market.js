"use strict";

let common = require('../lib/common');
let config = require('../lib/config');

let argv = require('yargs')
    .alias('config', 'c')
    .nargs('config', 1)
    .describe('config', "v20 Configuration File to use")
    .default('config', config.defaultConfigFile())
    .alias('instrument', 'i')
    .nargs('instrument', 1)
    .describe('instrument', "Instrument to trade")
    .coerce('instrument', (i) => i.replace(/\//g, "_"))
    .alias('units', 'u')
    .nargs('units', 1)
    .describe('units', "Units to trade")
    .help('help')
    .alias('help', "h")
    .demandOption(['instrument', 'units'])
    .argv;

let conf = new config.Config(argv.config);

let ctx = conf.createContext();

let marketOrder = new ctx.order.MarketOrderRequest({
    instrument: argv.instrument,
    units: argv.units
});

ctx.order.market(
    conf.activeAccount,
    marketOrder,
    response => {
        common.handleErrorResponse(response);
        common.dumpOrderCreateResponse(response);
    }
);
