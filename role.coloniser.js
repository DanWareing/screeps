var roleColoniser = {
  /** @param {Creep} creep **/
  run: function(creep) {
    if (creep.store.getFreeCapacity() === 0) {
      creep.moveTo(new RoomPosition(1, 1, "W2N1"));
      /*if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }*/
    } else {
      var sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0]);
      }
    }
  }
};

module.exports = roleColoniser;
