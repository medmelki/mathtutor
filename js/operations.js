var Operations = function () {

  const EMPTY_STRING = "";
  let contents = [];

  function reInitContents() {
    contents = [];
  }

  function remove(s) {
    s.map(e => e.html(EMPTY_STRING).removeClass("cell-selected filled-cell rooted-cell divided-cell"));
    flagCell(getPreviousFilledCell());
  }

  function copy(s) {
    reInitContents();
    for (let i = 0; i < s.length; i++) {
      contents.push(s[i].html());
    }
  }

  function cut(s) {
    reInitContents();
    copy(s);
    remove(s);
  }

  function paste(target, next) {
    for (let i = 0; i < contents.length; i++) {
      const content = contents[i];
      target.html(content);
      target = next(target);
    }
  }

  return {
    remove: remove,
    copy: copy,
    cut: cut,
    paste: paste
  }
}();
