class Customers {
    constructor(CONSTANTS, files, haversine, errHandler) {
        this.CONSTANTS = CONSTANTS;
        this.files = files;
        this.haversine = haversine;
        this.errHandler = errHandler;
    }

    // Gets the string filtered and parsed
    processCustomers(inputCustomers) {
        return new Promise((resolve, reject) => {

            // Parse customers into a valid format
            this.parseCustomers(inputCustomers)
                .then((parsedCustomers) => {

                    // Filters customers within MAX_DISTANCE (100km) from office
                    this.filterCustomers(parsedCustomers)
                        .then(filteredCustomers => {

                            // Sort customers by the id
                            this.sortCustomers(filteredCustomers)
                                .then((validCustomers) => {

                                    // Formats valid customers to export them
                                    this.formatCustomers(validCustomers)
                                        .then(
                                            (formattedCustomers) => {
                                                resolve(formattedCustomers);
                                            }
                                        )
                                        .catch(e => {
                                            reject(e);
                                        });
                                });
                        })
                        .catch(e => {
                            reject(e);
                        });
                })
                .catch(e => {
                    reject(e);
                });
        })
    }

    // Parse customers into a valid format
    parseCustomers(inputCustomers) {
        return new Promise((resolve, reject) => {
            let JSONCustomers = this.files.parseJSON(inputCustomers);
            let parsedCustomers = [];

            JSONCustomers.map((c) => {

                if (c != undefined) {
                    if (this.errHandler.chkCustomerParamElements(c)) {
                        parsedCustomers.push({
                            user_id: +(c.user_id), // string to number
                            name: c.name,
                            latitude: +(c.latitude), // string to number
                            longitude: +(c.longitude), // string to number
                        });
                    } else {
                        reject("Error getting customers. Check number of parameters of each element.");
                    }

                } else {
                    if (JSONCustomers.length == 1) {
                        reject("Error getting customers. No customers found. Check input file.");
                    }
                }
            });

            if (this.errHandler.chkParseCustomers(parsedCustomers)) { // everything ok
                resolve(parsedCustomers);
            } else {
                reject("Error getting customers. Check input file integrity.");
            }
        });
    }

    // Filters customers within MAX_DISTANCE (100km) from office
    filterCustomers(inputCustomers) {

        return new Promise((resolve, reject) => {
            let filteredCustomers = [];

            inputCustomers.map(c => {
                let position = {
                    latitude: c.latitude,
                    longitude: c.longitude
                }
                let distance = this.haversine.getDistance(this.CONSTANTS.OFFICE_CORDS, position);

                if (distance <= this.CONSTANTS.MAX_DISTANCE) {
                    filteredCustomers.push(c);
                }
            });

            if (filteredCustomers.length == 0) {
                reject("Error filtering customers. No valid customers found within 100km.");
            } else {
                resolve(filteredCustomers);
            }
        })
    }

    // Sort customers by the id
    sortCustomers(filteredCustomers) {
        return new Promise((resolve, reject) => {
            if (this.errHandler.chkSortCustomers(filteredCustomers)) {
                resolve(filteredCustomers.sort((a, b) => a.user_id - b.user_id));
            } else {
                reject("Error sorting customers.");
            }
        })
    }

    // Formats valid customers to export them
    formatCustomers(customers) {

        return new Promise((resolve, reject) => {
            let sorted = [];

            if (customers.length == 0) {
                reject("Error formatting customers.");
            } else {
                customers.map(c => {
                    sorted.push(`ID: ${c.user_id}    Name: ${c.name}`);
                    resolve(sorted);
                });
            }
        });
    }
}

module.exports = Customers;