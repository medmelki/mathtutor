/**
 * CopyCommand extends Command
 * @param targets
 * @constructor
 */

function CopyCommand(targets) {
  this.targets = targets.slice();
}


CopyCommand.prototype = Object.create(Command.prototype);

CopyCommand.prototype.execute = function () {
  Command.prototype.execute.call(this);
  Operations.copy(this.targets);
};

CopyCommand.prototype.undo = function () {
  Command.prototype.undo.call(this);
  Operations.clearCopiedContent();
};

CopyCommand.prototype.redo = function () {
  Command.prototype.redo.call(this);
  Operations.copy(this.targets);
};