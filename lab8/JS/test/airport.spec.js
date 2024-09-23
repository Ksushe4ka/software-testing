const assert = require("chai").assert;
const PassengerPlane = require("../Planes/PassengerPlane");
const MilitaryPlane = require("../Planes/MilitaryPlane");
const ExperimentalPlane = require("../Planes/ExperimentalPlane");
const MilitaryType = require("../models/MilitaryType");
const ExperimentalTypes = require("../models/ExperimentalTypes");
const ClassificationLevel = require("../models/ClassificationLevel");
const Airport = require("../Airport");

describe("My Test", () => {
  let planes = [
    new PassengerPlane("Boeing-737", 900, 12000, 60500, 164),
    new PassengerPlane("Boeing-737-800", 940, 12300, 63870, 192),
    new PassengerPlane("Boeing-747", 980, 16100, 70500, 242),
    new PassengerPlane("Airbus A320", 930, 11800, 65500, 188),
    new PassengerPlane("Airbus A330", 990, 14800, 80500, 222),
    new PassengerPlane("Embraer 190", 870, 8100, 30800, 64),
    new PassengerPlane("Sukhoi Superjet 100", 870, 11500, 50500, 140),
    new PassengerPlane("Bombardier CS300", 920, 11000, 60700, 196),

    new MilitaryPlane("B-1B Lancer", 1050, 21000, 80000, MilitaryType.TYPE_BOMBER),
    new MilitaryPlane("B-2 Spirit", 1030, 22000, 70000, MilitaryType.TYPE_BOMBER),
    new MilitaryPlane("B-52 Stratofortress", 1000, 20000, 80000, MilitaryType.TYPE_BOMBER),
    new MilitaryPlane("F-15", 1500, 12000, 10000, MilitaryType.TYPE_FIGHTER),
    new MilitaryPlane("F-22", 1550, 13000, 11000, MilitaryType.TYPE_FIGHTER),
    new MilitaryPlane("C-130 Hercules", 650, 5000, 110000, MilitaryType.TYPE_TRANSPORT),

    new ExperimentalPlane("Bell X-14",277,482,500,ExperimentalTypes.HIGH_ALTITUDE,ClassificationLevel.SECRET),
    new ExperimentalPlane("Ryan X-13 Vertijet",560,307,500,ExperimentalTypes.VTOL,ClassificationLevel.TOP_SECRET
    ),
  ];

  let planeWithMaxPassengerCapacity = new PassengerPlane("Boeing-747",980,16100,70500,242);
  const AIRPORT = new Airport(planes);

  it("should have military planes with transport type", () => {
    let transportMilitaryPlanes = AIRPORT.getTransportMilitaryPlanes();
    let hasTransportMilitaryPlanes = transportMilitaryPlanes.some(militaryPlane => militaryPlane.getMilitaryType() === MilitaryType.TYPE_TRANSPORT);
    assert.isTrue(hasTransportMilitaryPlanes);
  });

  it("should check passenger plane with max capacity", () => {
    let actualPlaneWithMaxPassengersCapacity = AIRPORT.getPassengerPlaneWithMaxPassengersCapacity();
    assert.deepEqual(actualPlaneWithMaxPassengersCapacity, planeWithMaxPassengerCapacity);
  });

  it("should sort planes by max load capacity", () => {
    AIRPORT.sortByMaxLoadCapacity();
    let planesSortedByMaxLoadCapacity = AIRPORT.getPlanes();
    let nextPlaneMaxLoadCapacityIsHigherThanCurrent = planesSortedByMaxLoadCapacity.every((plane, index) => {
        if (index === planesSortedByMaxLoadCapacity.length - 1) return true;
        return plane.getMinLoadCapacity() <= planesSortedByMaxLoadCapacity[index + 1].getMinLoadCapacity();
      });
      assert.isTrue(nextPlaneMaxLoadCapacityIsHigherThanCurrent);
  });

  it("should have at least one bomber in military planes", () => {
    let bomberMilitaryPlanes = AIRPORT.getBomberMilitaryPlanes();
    let hasBomber = bomberMilitaryPlanes.some(militaryPlane => militaryPlane.getMilitaryType() === MilitaryType.TYPE_BOMBER);
    assert.isTrue(hasBomber, "No bombers found in military planes!");
  });

  it("should check that experimentsl planes has classification level higher than unclassified", () => {
    let experimentalPlanes = AIRPORT.getExperimentalPlanes();
    let hasUnclassifiedPlanes = experimentalPlanes.some(plane => plane.classificationLevel === ClassificationLevel.UNCLASSIFIED);
    assert.isFalse(hasUnclassifiedPlanes, "There are unclassified experimental planes!");
  });
});