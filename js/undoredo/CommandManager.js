function CommandManager() {
  this.commandStack = [];
  this.current = -1;
}

CommandManager.prototype.execute = function (cmd) {
  if (cmd instanceof Command) {
    cmd.execute();
    /* We need to invalidate all commands after this new one
      or people are going to be very confused.
      We use splice as it deletes all elements after current
      So we have all the array until current. */
    this.commandStack.splice(++this.current);
    this.commandStack.push(cmd);
  }
};

CommandManager.prototype.undo = function () {
  let cmd;
  if (this.current >= 0) {
    cmd = this.commandStack[this.current--];
    cmd.undo();
  } else {
    throw new Error("Already at oldest change");
  }
};

CommandManager.prototype.redo = function () {
  let cmd;

  cmd = this.commandStack[this.current + 1];
  if (cmd) {
    cmd.redo();
    this.current++;
  } else {
    throw new Error("Already at newest change");
  }
};

CommandManager.prototype.invalidateAll = function () {
  this.commandStack = [];
  this.current = -1;
};