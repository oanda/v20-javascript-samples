"use strict";

var expandHomeDir = require('expand-home-dir')
var fs = require("fs");
var yaml = require('js-yaml');

var Context = require('@oanda/v20/context').Context;

class Config {
    constructor(file) {
        var doc = yaml.safeLoad(
            fs.readFileSync(
                expandHomeDir(file),
                "utf8"
            )
        );

        this.hostname = doc.hostname;
        this.streamingHostname = doc.streaming_hostname;
        this.port = doc.port;
        this.ssl = doc.ssl;
        this.token = doc.token;
        this.username = doc.username;
        this.accounts = doc.accounts;
        this.activeAccount = doc.active_account;
    }

    createContext() {
        let ctx = new Context(
            this.hostname,
            this.port,
            this.ssl,
            "oanda sample javascript"
        );

        ctx.setToken(this.token);

        return ctx;
    }

    createStreamingContext() {
        let ctx = new Context(
            this.streaming_hostname,
            this.port,
            this.ssl,
            "sample sample javascript"
        );

        ctx.setToken(this.token);

        return ctx;
    }
}

function defaultConfigFile()
{
    var configFile = "etc/v20.conf";

    if (process.env.V20_CONF)
    {
        configFile = process.env.V20_CONF;
    }

    configFile = expandHomeDir(configFile);

    if (!fs.existsSync(configFile))
    {
        throw "v20 config file '" + configFile + "' does not exist";
    }

    return configFile;
}

exports.Config = Config;
exports.defaultConfigFile = defaultConfigFile;
