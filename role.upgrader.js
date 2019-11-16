var roleUpgrader = {
  /** @param {Creep} creep **/
  run: function(creep) {
    if (creep.store.getFreeCapacity() === 0) {
      if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
      }
    } else {
      var nearestSource = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
      if (creep.harvest(nearestSource) == ERR_NOT_IN_RANGE) {
        creep.moveTo(nearestSource, {
          visualizePathStyle: { stroke: "#ffaa00" }
        });
      }
    }
  }
};

module.exports = roleUpgrader;
