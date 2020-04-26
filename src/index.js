import Parser from "./util/Parser.js";
import AlertManager from "./lib/AlertManager.js";
import MovingAverageAlert from "./lib/Alerts/MovingAverageAlert.js";
import TrendWindowAlert from "./lib/Alerts/TrendWindowAlert.js"
import NotificationManager from "./lib/NotificationManager.js"


const parser = new Parser();
const notifiers = new NotificationManager();
// Ideally fetch from config
const movingAverageAlertWindow = 300;
const movingAverageAlert = new MovingAverageAlert(movingAverageAlertWindow, notifiers);
const trendingWindowAlert = new TrendWindowAlert(movingAverageAlertWindow, notifiers, true);
const alertManager = new AlertManager([
    movingAverageAlert,
    trendingWindowAlert
]);


parser.on('data', function (data) {
    // console.log('Got json:', data)
    alertManager.process(data);
})

parser.on('end', function () {
    // console.log('No more data')
})

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