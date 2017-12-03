/**
 * CutCommand extends Command
 * @param targets
 * @constructor
 */

function CutCommand(targets) {
  this.targets = targets.slice();
  this.targetValues = [];
}


CutCommand.prototype = Object.create(Command.prototype);

CutCommand.prototype.execute = function () {
  Command.prototype.execute.call(this);
  Operations.cut(this.targets);
  this.targetValues = Operations.getCopiedContent();
};

CutCommand.prototype.undo = function () {
  Command.prototype.undo.call(this);
  Operations.clearCopiedContent();
  fillTargetsWithPreviousValues(this);

};

CutCommand.prototype.redo = function () {
  Command.prototype.redo.call(this);
  Operations.cut(this.targets);
};

// TODO : Refactor these functions to Command or CommandUtils or an abstract class having targets & targetValues

/**
 * Util functions
 */
function fillTargetsWithPreviousValues(that) {
  that.targets.map((e, i) => e.html(that.targetValues[i]));
}