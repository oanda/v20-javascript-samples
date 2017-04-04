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

let accountID = conf.activeAccount;

let ctx = conf.createContext();

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
                console.log(position.summary());

                if (position.long && position.long.units != "0")
                {
                    console.log("  " + position.long.summary());
                }
                if (position.short && position.short.units != "0")
                {
                    console.log("  " + position.short.summary());
                }
            }

            console.log();
        }
    }
);
