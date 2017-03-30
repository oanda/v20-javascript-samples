"use strict";

var common = require('./common');
var config = require('./config');

var argv = require('yargs')
    .alias('c', 'configFile')
    .nargs('c', 1)
    .describe('c', "v20 Configuration File to use")
    .default('c', config.defaultConfigFile())
    .help('h')
    .alias('h', "help")
    .argv;

var conf = new config.Config(argv.configFile);

var accountID = conf.activeAccount;

var ctx = conf.createContext();

ctx.account.get(
    accountID,
    response => {
        common.handleErrorResponse(response);

        let account = response.body.account;

        console.log(account.toString());
        console.log();

        if (account.pendingOrderCount > 0)
        {
            console.log("Pending Orders");
            console.log("==============");

            for (let order of account.orders)
            {
                console.log(order.title());
            }

            console.log();
        }

        if (account.openTradeCount > 0)
        {
            console.log("Open Trades");
            console.log("===========");

            for (let trade of account.trades)
            {
                console.log(trade.title());
            }

            console.log();
        }

        if (account.openPositionCount > 0)
        {
            console.log("Positions");
            console.log("=========");

            for (let position of account.positions)
            {
                console.log(position.title());
            }

            console.log();
        }
    }
);
