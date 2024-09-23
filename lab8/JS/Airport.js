const PassengerPlane = require('./Planes/PassengerPlane');
const MilitaryPlane = require('./Planes/MilitaryPlane');
const MilitaryType = require('./models/MilitaryType');
const ExperimentalPlane = require('./Planes/ExperimentalPlane');

class Airport {
    constructor(planes) {
        this.planes = planes;
    }

    getPassengerPlanes() {
        return this.planes.filter(plane => plane instanceof PassengerPlane);
    }

    getMilitaryPlanes() {
        return this.planes.filter(plane => plane instanceof MilitaryPlane);
    }

    getPassengerPlaneWithMaxPassengersCapacity() {
        const passengerPlanes = this.getPassengerPlanes();
        return passengerPlanes.reduce((maxPlane, currentPlane) => 
            currentPlane.getPassengersCapacity() > maxPlane.getPassengersCapacity() ? currentPlane : maxPlane
        );
    }

    getTransportMilitaryPlanes() {
        return this.getMilitaryPlanes().filter(plane => plane.getMilitaryType() === MilitaryType.TYPE_TRANSPORT);
    }

    getBomberMilitaryPlanes() {
        return this.getMilitaryPlanes().filter(plane => plane.getMilitaryType() === MilitaryType.BOMBER);
    }

    getExperimentalPlanes() {
        return this.planes.filter(plane => plane instanceof ExperimentalPlane);
    }

    sortByMaxDistance() {
        this.planes.sort((a, b) => a.getMaxFlightDistance() - b.getMaxFlightDistance());
        return this;
    }

    sortByMaxSpeed() {
        this.planes.sort((a, b) => a.getMaxSpeed() - b.getMaxSpeed());
        return this;
    }

    sortByMaxLoadCapacity() {
        this.planes.sort((a, b) => a.getMinLoadCapacity() - b.getMinLoadCapacity());
        return this;
    }

    getPlanes() {
        return this.planes;
    }

    static print(planes) {
        return JSON.stringify(planes);
    }
}

module.exports = Airport;
