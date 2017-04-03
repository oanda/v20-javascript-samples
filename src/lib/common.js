//
// Generic function that prints out response details if the HTTP response
// wasn't 2XX
//
exports.handleErrorResponse = function(response)
{
    if (response.statusCode.startsWith("2")) { return; }

    let s = response.method
            + " " + response.path
            + " " + response.statusCode;

    if (response.statusMessage !== undefined)
    {
        s += " " + response.statusMessage;
    }

    console.log(s);

    throw "HTTP " + response.statusCode;
}

//
// Function that prints out the summary for transactions found in an Order
// create response message
//
exports.dumpOrderCreateResponse = function(response)
{
    [ "orderCreateTransaction",
      "longOrderCreateTransaction",
      "shortOrderCreateTransaction",
      "orderFillTransaction",
      "longOrderFillTransaction",
      "shortOrderFillTransaction",
      "orderCancelTransaction",
      "longOrderCancelTransaction",
      "shortOrderCancelTransaction",
      "orderReissueTransaction",
      "orderRejectTransaction",
      "orderReissueRejectTransaction",
      "replacingOrderCancelTransaction",
    ].forEach(
        transactionName => {
            var transaction = response.body[transactionName];
            if (!transaction) { return; }
            console.log(transaction.summary());
        }
    );
}
