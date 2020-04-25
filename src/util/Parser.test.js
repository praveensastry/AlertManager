import Parser from "./Parser.js";

describe('Parser', () => {
    test('should parse json lines', () => {
        const expected = [
            { "test": "This is a test!" },
            { "jsonlines": "is awesome" }
        ];

        const actual = [];
        const p = new Parser();
        p.on('data', function (data) {
            actual.push(data);
        });
        p.write('{ "test": "This is a test!" }\n');
        p.write('{ "jsonlines": "is awesome" }');
        p.end();
        expect(expected).toEqual(actual);
    });
});