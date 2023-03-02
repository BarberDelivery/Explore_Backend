const assert = require('chai').assert;
const GoogleDistanceApi = require('../');

describe('GoogleDistanceApi', function() {

    describe('distance()', function() {

        it('should have a full options object', function(done) {
            const options = {
                key: '',
                origins: ['51.5033640,-0.1276250'],
                destinations: ['Manchester, UK']
            };
            GoogleDistanceApi.distance(options, (err, results) => {
                if (err) return done(err);
                var expectedData = {
                    origin: '11 Downing St, Westminster, London SW1A 2AB, UK',
                    destination: 'Manchester, UK'
                };

                const data = results[0];

                assert.isDefined(data.distance, 'Distance data is missing');
                assert.typeOf(data.distance, 'string', 'Distance data should be a string');

                assert.isDefined(data.distanceValue, 'Distance value is missing');
                assert.typeOf(data.distanceValue, 'number', 'Distance value should be a number');

                assert.isDefined(data.duration, 'Duration data is missing');
                assert.typeOf(data.duration, 'string', 'Duration data should be a string');

                assert.isDefined(data.durationValue, 'Duration data is missing');
                assert.typeOf(data.durationValue, 'number', 'Duration value should be a number');

                for (var key in expectedData) {
                    assert.strictEqual(data[key], expectedData[key], key + ':');
                }
                done();
            });
        });
    });
});