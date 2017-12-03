const CELL_SIDE = 62;

var selectedCell;

var CommandManager = new CommandManager();

var multiSelect = false;
var rootMode = false;
var divisionMode = false;
var fractionMode = false;
var fractionUp = true;
var fractionDown = false;

var indexingUpLeftMode = false;
var indexingUpRightMode = false;
var indexingUpDownMode = false;

var indexingRootMode = false;

var selectedCells = [];

var columnsNumber = 0;
var rowsNumber = 0;


function drawGrid(w, h) {

  var grid = $('#grid');
  var grid_width, grid_height;

  grid.empty();

  if (w === 0) {
    grid_width = grid.width();
  } else {
    grid_width = w;
  }
  if (h === 0) {
    grid_height = grid.height();
  } else {
    grid_height = h;
  }

  var cell = "<td class='cell'></td>";


  rowsNumber = Math.floor(grid_height / CELL_SIDE);
  columnsNumber = Math.floor(grid_width / CELL_SIDE);
  for (let i = 0; i < rowsNumber; i++) {
    for (let j = 0; j < columnsNumber; j++) {
      grid.append(cell);
    }
  }
  addCellClickBehavior(); // flag current cell selected

}

/**
 *
 * @param cell : jquery DOM element
 */
function flagCell(cell) {

  if (multiSelect) {
    if (selectedCells.length < 1 && selectedCell) {
      selectedCells.push(selectedCell);
    }
    if (cell.hasClass("cell-selected")) {
      cell.removeClass("cell-selected");
      selectedCells.splice(selectedCells.indexOf(cell), 1);
    } else {
      cell.addClass("cell-selected");
      selectedCells.push(cell);
    }
  } else {
    cell.addClass("cell-selected");
    if (selectedCell && cell !== selectedCell) {
      selectedCell.removeClass("cell-selected");
    }
    selectedCell = cell;
  }
}

function getPreviousFilledCell() {
  if (selectedCell) {
    return selectedCell.prevAll("td.filled-cell:eq(0)");
  }
}

function getCurrentCell() {
  if (selectedCell) {
    return selectedCell;
  }
}

// TODO : delete and replace with nextCell from Selection Util
function getNextCell() {
  return selectedCell.next("td.cell");
}

function isIndexingMode(previousFilledCell) {
  if (previousFilledCell) {
    return previousFilledCell.data("indexingUpRightApplied") ||
      previousFilledCell.data("indexingUpLeftApplied") ||
      previousFilledCell.data("indexingDownApplied") ||
      (previousFilledCell.data("rootIndexingApplied") && rootMode);
  }
  return false;
}

var Selection = function () {
  let selected = [];

  function reinitParams() {
    selected = [];
  }

  function nextCell(target) {
    return target.next("td.cell");
  }

  function prepareSelection() {
    reinitParams();
    if (multiSelect)
      selected = selectedCells;
    else
      selected.push(selectedCell);
  }

  function getSelected() {
    prepareSelection();
    return selected;
  }

  return {
    getSelected: getSelected,
    getNext: nextCell
  }
}();