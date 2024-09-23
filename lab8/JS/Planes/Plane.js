class Plane {
    constructor(model, maxSpeed, maxFlightDistance, maxLoadCapacity) {
        this.model = model;
        this.maxSpeed = maxSpeed;
        this.maxFlightDistance = maxFlightDistance;
        this.maxLoadCapacity = maxLoadCapacity;
    }

    get model() {
        return this.model;
    }

    get maxSpeed() {
        return this.maxSpeed;
    }

    get maxFlightDistance() {
        return this.maxFlightDistance;
    }

    get maxLoadCapacity() {
     let result = this.maxLoadCapacity;
     return result;
    }
}

module.exports = Plane;
