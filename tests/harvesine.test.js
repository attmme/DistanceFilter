const ErrorHandler = require('../inc/errorHandler.js');
const Constants = require('../inc/constants.js');
const Haversine = require('../inc/haversine');

const CONSTANTS = new Constants();
let errHandler = new ErrorHandler();
haversine = new Haversine(CONSTANTS, errHandler);

// Testing measures
let testPoints = [{
  latitude: 40.463667,
  longitude: -3.74922
}, {
  latitude: 40.463667,
  longitude: -2.56716
}]

// getDistance function
test('Wrong input in \'getDistance\' should return error', () => {
  expect(haversine.getDistance('a', ' ')).toBe("Error getting distance");
});

test('Wrong input in \'getDistance\' should return error', () => {
  expect(haversine.getDistance(undefined, 53)).toBe("Error getting distance");
});

test('Expect distance to be \'0\'', () => {
  expect(haversine.getDistance(testPoints[0], testPoints[0])).toBe(0);
});

test('Expect distance to be \'100.000 m\'', () => {
  expect(+(haversine.getDistance(testPoints[0], testPoints[1])).toFixed(0)).toBe(100000);
});


// toRadians function
 test('Wrong input in \'toRadians\', should return error', () => {
  expect(haversine.toRadians(undefined)).toBe("Error calculating radians");
});

test('Conversion of \'180\' grades should return \'PI\' radians', () => {
  expect(haversine.toRadians(180)).toBe(Math.PI);
});