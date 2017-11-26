var Operations = function () {

  const EMPTY_STRING = "";
  let contents = [];

  function copy(s) {
    for (let i = 0; i < s.length; i++) {
      contents.push(s[i].html());
    }
  }

  function cut(s) {
    copy(s);
    s.map(e => e.html(EMPTY_STRING));
  }

  function paste(target, next) {
    for (let i = 0; i < contents.length; i++) {
      const content = contents[i];
      target.html(content);
      target = next(target);
    }
  }

  return {
    copy: copy,
    cut: cut,
    paste: paste
  }
}();
