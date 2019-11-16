var actions = {
  /** @param {Creep} creep **/
  harvest: function(creep) {
    var nearestSource = creep.pos.findClosestByRange(FIND_SOURCES);

    // If creep has arrived, mine
    if (
      creep.memory._move &&
      creep.pos.x === creep.memory._move.dest.x &&
      creep.pos.y === creep.memory._move.dest.y
    ) {
      creep.harvest(nearestSource);
      return;
    }

    // get other creep's destinations
    let otherCreepDests = [];
    for (let creep in Game.creeps) {
      if (Game.creeps[creep].memory._move) {
        otherCreepDests.push(Game.creeps[creep].memory._move.dest);
      }
    }

    // select source and position
    var foundPosition = this.selectPosition(
      creep,
      nearestSource,
      otherCreepDests
    );
    for (let source in creep.room.find(FIND_SOURCES)) {
      foundPosition = this.selectPosition(
        creep,
        creep.room.find(FIND_SOURCES)[source],
        otherCreepDests
      );
      if (foundPosition) return;
    }

    // else go home
    if (foundPosition == false) {
      creep.moveTo(Game.spawns["Spawn1"].pos, {
        visualizePathStyle: { stroke: "#ffaa00" }
      });
    }
  },

  selectPosition: function(creep, targetSource, otherCreepDests) {
    // get all spaces around resource
    var startPos = new RoomPosition(
      targetSource.pos.x - 1,
      targetSource.pos.y - 1,
      targetSource.pos.roomName
    );

    // for all spaces around resource
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        var currentPos = new RoomPosition(
          startPos.x + i,
          startPos.y + j,
          startPos.roomName
        );

        // if one is free, go to
        if (
          creep.room.lookAt(currentPos).length === 1 &&
          creep.room.lookAt(currentPos)[0].type === "terrain" &&
          creep.room.lookAt(currentPos)[0].terrain === "plain"
        ) {
          if (!otherCreepDests.includes(currentPos)) {
            creep.moveTo(currentPos, {
              visualizePathStyle: { stroke: "#ffaa00" }
            });
            return true;
          }
        }
      }
    }
    return false;
  }
};

module.exports = actions;
