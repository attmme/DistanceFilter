const ErrorHandler = require('../inc/errorHandler.js');
const Constants = require('../inc/constants.js');
const Customers = require('../inc/customers');
const Haversine = require('../inc/haversine');
const Files = require('../inc/files');

// Testing data
let inputCustomers = {
  "user_id": 1,
  "latitude": 40.463667,
  "name": "Oscar Gomez",
  "longitude": -3.74922
}

// Classes
const CONSTANTS = new Constants();

class TestConstants {
  OFFICE_CORDS = {
    latitude: 40.463667,
    longitude: -2.57
  };
  EARTH_RADIUS = CONSTANTS.EARTH_RADIUS;
  MAX_DISTANCE = 100000;
}

let errHandler = new ErrorHandler();

let haversine = new Haversine(CONSTANTS, errHandler);
let files = new Files();
let TEST_CONSTANTS = new TestConstants();

let customers = new Customers(TEST_CONSTANTS, files, haversine, errHandler);


// parseCustomers
test('Expected output to be equal to input', () => {

  let strCustomers = {
    "user_id": "1",
    "latitude": "40.463667",
    "name": "Oscar Gomez",
    "longitude": "-3.74922"
  }

  return customers.parseCustomers(JSON.stringify(strCustomers))
    .then(data => {
      expect([...data][0]).toStrictEqual(inputCustomers);
    });
});

test('Expected output to be error when having wrong \'customer\' format', () => {
  expect.assertions(1);

  return customers.parseCustomers(JSON.stringify({}))
    .catch(e => {
      expect(e).toBe("Error getting customers. Check number of parameters of each element.");
    });
});


// filterCustomers
test('Expected output to be equal to input', () => {

  return customers.filterCustomers([inputCustomers])
    .then(data => {
      expect([...data][0]).toStrictEqual(inputCustomers);
    });
});

test('Expected output to be error when having wrong \'customer\' format', () => {
  expect.assertions(1);

  return customers.filterCustomers([{}])
    .catch(e => {
      expect(e).toBe("Error filtering customers. No valid customers found within 100km.");
    });
});

test('Expected output to be error when having wrong \'validCustomers\' data type', () => {
  expect.assertions(1);

  let users = [{
    user_id: 1,
    name: 'Oscar G',
  }, {
    user_id: 'a',
    name: 'Oscar G',
  }]

  return customers.filterCustomers(users)
    .catch(e => {
      expect(e).toStrictEqual("Error filtering customers. No valid customers found within 100km.");
    });
});

test('Expected output to be error when having wrong \'validCustomers\' format', () => {
  expect.assertions(1);

  return customers.filterCustomers([{
    "user_id": 5
  }])
    .catch(e => {
      expect(e).toStrictEqual("Error filtering customers. No valid customers found within 100km.");
    });
});

test('Expected output to be error when having wrong \'user_id\' data type', () => {
  expect.assertions(1);

  return customers.filterCustomers([{
    user_id: 1,
    name: 'Oscar G',
    latitude: 53.1489345,
    longitude: -7.2875,
  }])
    .catch(e => {
      expect(e).toBe("Error filtering customers. No valid customers found within 100km.");
    });
});


// sortCustomers
test('Expected output to be sorted', () => {
  expect.assertions(1);
  let idCustomers = [{
      user_id: 1
    },
    {
      user_id: 2
    },
    {
      user_id: 5
    },
    {
      user_id: 1
    },
    {
      user_id: 9
    },
    {
      user_id: 3
    },
  ];

  return customers.sortCustomers(idCustomers)
    .then(data => {
      expect(data).toStrictEqual([{
          "user_id": 1
        },
        {
          "user_id": 1
        },
        {
          "user_id": 2
        },
        {
          "user_id": 3
        },
        {
          "user_id": 5
        },
        {
          "user_id": 9
        }
      ]);
    });
});

test('Expected output to be error when having wrong \'inputCustomers id\' data type', () => {
  return customers.sortCustomers([{
      "user_id": 'a'
    }])
    .catch(e => {
      expect(e).toStrictEqual("Error sorting customers.");
    });
});


// processCustomers
test('Expected output to be processed', () => {
  let user = {
    "latitude": "40.463667",
    "user_id": 1,
    "name": "Oscar G",
    "longitude": "-3.57",
  }

  return customers.processCustomers(JSON.stringify(user))
    .then(data => {
      expect(data[0]).toStrictEqual("ID: 1    Name: Oscar G");
    });
});