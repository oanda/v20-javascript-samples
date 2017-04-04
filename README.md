# v20-javascript-samples

This repo contains a suite of Javascript (node) sample code that demonstrates
the use of OANDA's v20 REST API along with OANDA's v20 bindings for Javascript.
The samples are limited in scope, and will only be expanded based on demand.
The intent of this repo is to provide some high-level examples which show how
to use the Javascript bindings.

## Configuration

Using OANDA's v20 REST API requires configuration that is used to set up
connections and interact with the endpoints. This configuration includes
hostnames, ports, tokens and account information.

The configuration is stored in a .yaml file with the format described
in `etc/v20.conf`, and resembles the following:

```
hostname: api-fxpractice.oanda.com
streaming_hostname: stream-fxpractice.oanda.com
port: 443
ssl: true
token: e6ab562b039325f12a026c6fdb7b71bb-b3d8721445817159410f01514acd19hbc
username: user
accounts:
- 101-001-100000-001
- 101-001-100000-002
active_account: 101-001-100000-001
```

To use the configuration, each sample script must be run with the `--config`
option that points to a valid config file. The default location of the
config file is `etc/v20.conf`. To change the default location of the configuration
file, the `V20_CONF` environment variable can be set. For example:

```
user@host: ~/v20-javascript-samples$ export V20_CONF=/home/user/v20.conf
user@host: ~/v20-javascript-samples$ node src/account_details.js
```

## Sample Code

Following is a listing of the sample code provided.

| Source File | Description | Example |
| ----------- | ----------- | ------- |
| `src/account/details.js` | Fetch details for the configured Account | `user@host ~/v20-javascript-samples$ node src/account/details.js` |
| `src/order/market.js` | Create a Market Order in the configured Account | `user@host ~/v20-javascript-samples$ node src/order/market.js --instrument EUR/USD --units 100` |
| `src/transaction/stream.js` | Create an Account Transaction stream | `user@host ~/v20-javascript-samples$ node src/transaction/stream.js` |
| `src/pricing/stream.js` | Create an Account Pricing stream | `user@host ~/v20-javascript-samples$ node src/pricing/stream.js` |
