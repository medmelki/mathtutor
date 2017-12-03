/**
 * RemoveCommand extends Command
 * @param targets
 * @constructor
 */

function RemoveCommand(targets) {
  this.targets = targets.slice();
  this.targetValues = [];
}


RemoveCommand.prototype = Object.create(Command.prototype);

RemoveCommand.prototype.execute = function () {
  Command.prototype.execute.call(this);
  for (let i = 0; i < this.targets.length; i++) {
    this.targetValues[i] = this.targets[i].html();
  }
  Operations.remove(this.targets);
};

RemoveCommand.prototype.undo = function () {
  Command.prototype.undo.call(this);
  fillTargetsWithPreviousValues(this);
};

RemoveCommand.prototype.redo = function () {
  Command.prototype.redo.call(this);
  Operations.remove(this.targets);
};