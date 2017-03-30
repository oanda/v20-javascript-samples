"use strict";

var common = require('./common');
var config = require('./config');

var argv = require('yargs')
    .alias('c', 'configFile')
    .nargs('c', 1)
    .describe('c', "v20 Configuration File to use")
    .default('c', config.defaultConfigFile())
    .alias('i', 'instrument')
    .nargs('i', 1)
    .describe('i', "Instrument to trade")
    .coerce('i', (i) => i.replace(/\//g, "_"))
    .alias('u', 'units')
    .nargs('u', 1)
    .describe('u', "Units to trade")
    .help('h')
    .alias('h', "help")
    .demandOption(['i', 'u'])
    .argv;

var conf = new config.Config(argv.configFile);

var accountID = conf.activeAccount;

var ctx = conf.createContext();

var marketOrder = new ctx.order.MarketOrderRequest({
    instrument: argv.instrument,
    units: argv.units
});

ctx.order.market(
    accountID, 
    marketOrder,
    response => {
        common.handleErrorResponse(response);
        common.dumpOrderCreateResponse(response);
    }
);
