class Haversine {
    constructor(CONST, errHandler) {
        this.CONST = CONST;
        this.errHandler = errHandler;
    }

    // Returns the distance between two coordinates
    getDistance(positionA, positionB) {
        try {
            // Checking input errors
            if (!this.errHandler.chkGetDistance(positionA, positionB)) {
                throw ("Error getting distance");
            }

            // Parse latitudes to radians
            let lat1 = this.toRadians(positionA.latitude);
            let lat2 = this.toRadians(positionB.latitude);

            // Get the difference between the two points
            let latDiff = this.toRadians(positionB.latitude - positionA.latitude);
            let longDiff = this.toRadians(positionB.longitude - positionA.longitude);

            // Haversine formula
            let hav = Math.sin(latDiff / 2) ** 2 +
                Math.cos(lat1) * Math.cos(lat2) *
                Math.sin(longDiff / 2) ** 2;

            let c = 2 * Math.atan2(Math.sqrt(hav), Math.sqrt(1 - hav));

            // Calculate the distance in meters
            let distance = +(this.CONST.EARTH_RADIUS * c).toFixed(2);

            return distance;

        } catch (e) {
            return e;
        }
    }

    // Calculates grades to radians
    toRadians(grades) {
        try {
            // Checking input errors
            if (!this.errHandler.chkToRadians(grades)) {
                throw ("Error calculating radians");
            }
            return grades * Math.PI / 180;
        } catch (e) {
            return e;
        }
    }
}

module.exports = Haversine;