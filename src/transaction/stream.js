"use strict";

let common = require('../lib/common');
let config = require('../lib/config');

let argv = require('yargs')
    .alias('config', 'c')
    .nargs('config', 1)
    .describe('config', "v20 Configuration File to use")
    .default('config', config.defaultConfigFile())
    .help('help')
    .alias('help', "h")
    .argv;

let conf = new config.Config(argv.config);

let ctx = conf.createStreamingContext();

ctx.transaction.stream(
    conf.activeAccount,
    (message) => {
        console.log(
            message.summary()
        );
    },
    (response) => {
        console.log(response);
    }
);
