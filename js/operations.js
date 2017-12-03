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

  function add(element) {
    if (selectedCell) {
      if (fractionMode) {
        if (fractionUp) {
          if (!selectedCell.hasClass("fraction-cell"))
            selectedCell.html(`<span>${$(element).text()}</span>&frasl;<sub></sub>`).addClass("fraction-cell");
          else
            selectedCell.html(
              selectedCell.html()
                .replace(/<span>(.*)<\/span>/,
                  `<span>$1${$(element).text()}</span>`));
        } else {
          selectedCell.html(
            selectedCell.html()
              .replace(/<sub>(.*)<\/sub>/,
                `<sub>$1${$(element).text()}</sub>`));
        }
      } else {
        selectedCell.html($(element).clone().addClass("key-cloned"));
        selectedCell.addClass("filled-cell");

        let nextCell = getNextCell();
        if (getNextCell()) {
          flagCell(nextCell);
          if (rootMode) {
            nextCell.addClass('rooted-cell');
          }
          if (divisionMode) {
            nextCell.addClass('divided-cell');
          }
        }
      }
    }
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

  function lengthOfCopiedContent() {
    return contents.length;
  }

  function getContents() {
    return contents;
  }

  return {
    add: add,
    remove: remove,
    copy: copy,
    cut: cut,
    paste: paste,
    lengthOfCopiedContent: lengthOfCopiedContent,
    clearCopiedContent: reInitContents,
    getCopiedContent: getContents
  }
}();
