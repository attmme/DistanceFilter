const Files = require('./inc/files.js');
const Constants = require('./inc/constants.js');
const Haversine = require('./inc/haversine.js');
const Customers = require('./inc/customers.js');
const ErrorHandler = require('./inc/errorHandler.js');

// Instantiate classes
const CONSTANTS = new Constants();
let errHandler = new ErrorHandler();
let files = new Files();
let haversine = new Haversine(CONSTANTS, errHandler);
let customers = new Customers(CONSTANTS, files, haversine, errHandler);

main();

// Main function
function main() {

    // Retrieve customers data
    files.getFile(CONSTANTS.INPUT_FILE)
        .then((inputCustomers) => {

            // Export valid (and sorted) customers into output file
            customers.processCustomers(inputCustomers)
                .then(exportCustomers => {
                    files.saveFile(CONSTANTS.OUTPUT_FILE, exportCustomers.join('\r\n'))
                    console.log("File created successfully at data/output.txt")
                })
                .catch(e => {
                    console.log(e)
                });
        })
        .catch(e => {
            console.log(e)
        });
}