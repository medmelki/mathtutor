/**
 * PasteCommand extends Command
 * @param target
 * @param nextFn : function that selects the next cell
 * @constructor
 */

function PasteCommand(target, nextFn) {
  this.target = target.slice();
  this.nextFn = nextFn;
  this.targetValues = [];
}


PasteCommand.prototype = Object.create(Command.prototype);


PasteCommand.prototype.execute = function () {
  Command.prototype.execute.call(this);
  saveOverriddenContent(this);
  Operations.paste(this.target, this.nextFn);
};

PasteCommand.prototype.undo = function () {
  Command.prototype.undo.call(this);
  for (let i = 0, target = this.target; i < this.targetValues.length; i++) {
    target.html(this.targetValues[i]);
    target = this.nextFn(target);
  }
};

PasteCommand.prototype.redo = function () {
  Command.prototype.redo.call(this);
  Operations.paste(this.target, this.nextFn);
};

/**
 * Util functions
 */

function saveOverriddenContent(that) {
  let size = Operations.lengthOfCopiedContent();
  let target = that.target;
  for (let i = 0; i < size; i++) {
    that.targetValues[i] = target.html();
    target = that.nextFn(target);
  }
}