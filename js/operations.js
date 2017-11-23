var Operations = function () {

  const EMPTY_STRING = "";
  let contents = [];

  function prepareContents(s) {
    contents = contents.concat(Array.isArray(s) ? s : [s]);
  }

  function copy(s) {
    prepareContents(s);
    contents.map((c, i) => s[i].html());
  }

  function cut(s) {
    copy(s);
    s.map(e => e.html(EMPTY_STRING));
  }

  function paste(t) {
    t.map((e, i) => e.html(contents[i]));
  }

  return {
    copy: copy,
    cut: cut,
    paste: paste
  }
}();
