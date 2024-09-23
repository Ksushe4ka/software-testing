const Plane = require("./Plane");

class ExperimentalPlane extends Plane {
  constructor(model, maxSpeed, maxFlightDistance, maxLoadCapacity) {
    super(model, maxSpeed, maxFlightDistance, maxLoadCapacity);
    this._type = type;
    this._classificationLevel = classificationLevel;
  }

  get type() {
    return this._type;
  }

  set type(value) {
    this._type = value;
  }

  get classificationLevel() {
    return this._classificationLevel;
  }

  set classificationLevel(value) {
    this._classificationLevel = value;
  }
}

module.exports = experimentalPlane;