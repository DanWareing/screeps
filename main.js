var roleHarvester = require("role.harvester");
var roleUpgrader = require("role.upgrader");
var roleBuilder = require("role.builder");
var roleColoniser = require("role.coloniser");
var garbageCollector = require("util.garbage");

module.exports.loop = function() {
  garbageCollector.run();

  var harvesters = _.filter(
    Game.creeps,
    creep => creep.memory.role == "harvester"
  );
  if (harvesters.length < 4) {
    var newName = "Harvester" + Game.time;
    Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE], newName, {
      memory: { role: "harvester" }
    });
  }

  var upgraders = _.filter(
    Game.creeps,
    creep => creep.memory.role == "upgrader"
  );
  if (upgraders.length < 6) {
    var newName = "Upgrader" + Game.time;
    Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE], newName, {
      memory: { role: "upgrader" }
    });
  }

  var builders = _.filter(Game.creeps, creep => creep.memory.role == "builder");
  if (builders.length < 3) {
    var newName = "Builder" + Game.time;
    Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE], newName, {
      memory: { role: "builder" }
    });
  }

  var colonisers = _.filter(
    Game.creeps,
    creep => creep.memory.role == "coloniser"
  );
  if (colonisers.length < 0) {
    var newName = "Coloniser" + Game.time;
    Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE, CLAIM], newName, {
      memory: { role: "coloniser" }
    });
  }

  if (Game.spawns["Spawn1"].spawning) {
    var spawningCreep = Game.creeps[Game.spawns["Spawn1"].spawning.name];
    Game.spawns["Spawn1"].room.visual.text(
      "🛠️" + spawningCreep.memory.role,
      Game.spawns["Spawn1"].pos.x + 1,
      Game.spawns["Spawn1"].pos.y,
      { align: "left", opacity: 0.8 }
    );
  }

  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    if (creep.memory.role == "harvester") {
      roleHarvester.run(creep);
    }
    if (creep.memory.role == "upgrader") {
      roleUpgrader.run(creep);
    }
    if (creep.memory.role == "builder") {
      roleBuilder.run(creep);
    }
    if (creep.memory.role == "coloniser") {
      roleColoniser.run(creep);
    }
  }
};
