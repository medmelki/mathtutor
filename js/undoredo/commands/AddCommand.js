/**
 * AddCommand extends Command
 * @param source : key in navigation menu
 * @constructor
 */

function AddCommand(source) {
  this.source = source;
  // Does not support currently multi selection
  this.target = Selection.getSelected().slice()[0];
  this.previousContent = "";
}


AddCommand.prototype = Object.create(Command.prototype);

AddCommand.prototype.execute = function () {
  Command.prototype.execute.call(this);
  this.previousContent = this.target.html();
  Operations.add(this.source);
};

AddCommand.prototype.undo = function () {
  Command.prototype.undo.call(this);
  this.target.html(this.previousContent);
  flagCell(this.target);
};

AddCommand.prototype.redo = function () {
  Command.prototype.redo.call(this);
  Operations.add(this.source);
};