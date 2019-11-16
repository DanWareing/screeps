var roleUpgrader = {
  /** @param {Creep} creep **/
  run: function(creep) {
    if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
      creep.memory.upgrading = false;
      creep.say("🔄 harvest");
    }
    if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
      creep.memory.upgrading = true;
      creep.say("🚧 upgrade");
    }

    if (creep.memory.upgrading) {
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
