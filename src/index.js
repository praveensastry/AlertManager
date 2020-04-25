import Parser from './lib/Parser.js';
const p = new Parser();

// var jsonlines = require('jsonlines');
// var p = jsonlines.parse();

p.on('data', function (data) {
    console.log('Got json:', data)
})

p.on('end', function () {
    console.log('No more data')
})

p.write('{ "test": "This is a test!" }\n')
p.write('{ "jsonlines": "is awesome" }')
p.end()