import Parser from "./util/Parser.js";
import AlertManager from "./lib/AlertManager.js";
import MovingAverageAlert from "./lib/Alerts/MovingAverageAlert.js";
import TrendWindowAlert from "./lib/Alerts/TrendWindowAlert.js"
import NotificationManager from "./lib/NotificationManager.js"

// Load Config
// Ideally fetch from env / external config store
const movingAverageAlertWindow = 300;
const trendWindowAlertThrottleDuration = 60;

const notifiers = new NotificationManager();
const movingAverageAlert = new MovingAverageAlert(movingAverageAlertWindow, notifiers);
const trendingWindowAlert = new TrendWindowAlert(movingAverageAlertWindow, notifiers, trendWindowAlertThrottleDuration, true);
const alertManager = new AlertManager([
    movingAverageAlert,
    trendingWindowAlert
]);

// Test Driver
// Ideally I would write integration tests but hardcoding it as I had limited time

const parser = new Parser();
parser.on('data', function (data) {
    // Since Alert Manager is part of the lib, it can se used from multiple places
    // When file streams are piped as shown here, for developing SDKs and exposing APIs
    alertManager.process(data);
})

parser.on('end', function () {
    //place for clean up
})

// Instead of this a filestream can be piped to parser.
parser.write('{ "timestamp": 1554933784.023, "currencyPair": "CNYAUD", "rate": 0.39281 }\n');
parser.write('{ "timestamp": 1554933785.023, "currencyPair": "CNYAUD", "rate": 0.39281 }\n');
parser.write('{ "timestamp": 1554933786.023, "currencyPair": "CNYAUD", "rate": 0.39281 }\n');
parser.write('{ "timestamp": 1554933787.023, "currencyPair": "CNYAUD", "rate": 0.39281 }\n');
parser.write('{ "timestamp": 1554933787.023, "currencyPair": "USDAUD", "rate": 0.39281 }\n');
parser.write('{ "timestamp": 1554933788.023, "currencyPair": "USDAUD", "rate": 0.39281 }\n');
parser.write('{ "timestamp": 1554933789.023, "currencyPair": "USDAUD", "rate": 0.39281 }\n');
parser.write('{ "timestamp": 1554933790.023, "currencyPair": "USDAUD", "rate": 0.39281 }\n');
parser.write('{ "timestamp": 1554933788.023, "currencyPair": "CNYAUD", "rate": 0.39281 }\n');
parser.write('{ "timestamp": 1554933789.023, "currencyPair": "CNYAUD", "rate": 0.39281 }\n');
parser.write('{ "timestamp": 1554933790.023, "currencyPair": "CNYAUD", "rate": 0.39281 }\n');
parser.write('{ "timestamp": 1554933791.023, "currencyPair": "CNYAUD", "rate": 0.39281 }\n');
parser.write('{ "timestamp": 1554933792.023, "currencyPair": "CNYAUD", "rate": 0.39281 }\n');
parser.write('{ "timestamp": 1554933793.023, "currencyPair": "CNYAUD", "rate": 0.39281 }\n');
parser.write('{ "timestamp": 1554933794.023, "currencyPair": "CNYAUD", "rate": 0.59281 }\n');
parser.write('{ "timestamp": 1554933784.023, "currencyPair": "USDAUD", "rate": 0.39281 }\n');
parser.write('{ "timestamp": 1554933785.023, "currencyPair": "USDAUD", "rate": 0.39281 }\n');
parser.write('{ "timestamp": 1554933786.023, "currencyPair": "USDAUD", "rate": 0.39281 }\n');
parser.write('{ "timestamp": 1554933787.023, "currencyPair": "USDAUD", "rate": 0.39281 }\n');
parser.write('{ "timestamp": 1554933788.023, "currencyPair": "USDAUD", "rate": 0.39281 }\n');
parser.write('{ "timestamp": 1554933789.023, "currencyPair": "USDAUD", "rate": 0.39281 }\n');
parser.write('{ "timestamp": 1554933790.023, "currencyPair": "USDAUD", "rate": 0.39281 }\n');
parser.write('{ "timestamp": 1554933791.023, "currencyPair": "USDAUD", "rate": 0.39281 }\n');
parser.write('{ "timestamp": 1554933792.023, "currencyPair": "USDAUD", "rate": 0.39281 }\n');
parser.write('{ "timestamp": 1554933793.023, "currencyPair": "USDAUD", "rate": 0.39281 }\n');
parser.write('{ "timestamp": 1554933794.023, "currencyPair": "USDAUD", "rate": 0.59281 }\n');
parser.end()