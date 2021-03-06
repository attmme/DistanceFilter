class Files {
    constructor() {
        this.fs = require('fs');
    }

    getFile(fileName) {
        return new Promise((resolve, reject) => {
            this.fs.readFile(fileName, (err, data) => {
                if (err) {
                    reject("Error getting file");
                } else {
                    resolve(data.toString());
                }
            })
        });
    }

    saveFile(fileName, content) {
        this.fs.writeFile(fileName, content, (err) => {
            if (err) {
                throw ("Error saving file");
            }
        });
    }

    parseJSON(inputString) {
        try {
            return inputString.split('\n').map((customer) => {
                    if (customer.length > 0) {
                        return JSON.parse(customer)
                    }
                }
            );
        } catch {
            throw ("Error parsing file");
        }
    }
}

module.exports = Files;