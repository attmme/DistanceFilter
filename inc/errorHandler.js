class ErrorHandler {
    // Every funciton returns true when input is ok, false when detected an error

    // Error handlers from haversine class
    chkGetDistance(positionA, positionB) {
        try {
            return (
                this.isNumber([positionA.latitude, positionB.latitude,
                    positionB.longitude, positionB.longitude
                ]) &&
                this.isObject([positionA, positionB])
            );
        } catch {
            return false;
        }
    }

    chkToRadians(grades) {
        try {
            return (this.isNumber([grades]));
        } catch {
            return false;
        }
    }

    // Error handlers from customers class
    chkCustomerParamElements(customer) {

        // Customer must contain 4 different elements
        try {
            return (Object.keys(customer).length == 4);
        } catch {
            return false;
        }
    }

    chkSortCustomers(filteredCustomers) {
        try {
            return (
                this.isObject([filteredCustomers]) &&
                Object.keys(filteredCustomers).length >= 1 &&
                this.isNumberObj(filteredCustomers, "user_id") // CANVIAR, nomes esta revisant el 1r
            );
        } catch {
            return false;
        }
    }

    chkParseCustomers(inputCustomers) {
        let isCorrect = true;
        try {
            inputCustomers.map((el) => {

                if (!(
                        this.isObject([el]) &&
                        this.isNumber([el.user_id]) &&
                        this.isString([el.name]) &&
                        this.isNumber([el.latitude]) &&
                        this.isNumber([el.longitude])
                    )) {
                    isCorrect = false;
                }
            });
            return isCorrect;
        } catch {
            return false;
        }
    }

    // General prupose checkers
    isNumber(input) {
        try {
            input.map(el => {
                if (isNaN(el)) {
                    throw false;
                }
            });
            return true;
        } catch {
            return false;
        }
    }

    isNumberObj(input, obj) {
        try {
            input.map(el => {
                if (!this.isNumber([el[obj]])) {
                    throw false;
                }
            });
            return true;
        } catch {
            return false;
        }
    }

    isString(input) {
        try {
            input.map(el => {
                if (typeof (el) != "string") {
                    throw (false);
                }
            })
            return true;
        } catch {
            return false;
        }
    }

    isObject(input) {
        try {
            input.map(el => {
                if (typeof (el) != "object") {
                    throw (false);
                }
            })
            return true;
        } catch {
            return false;
        }
    }
}

module.exports = ErrorHandler;