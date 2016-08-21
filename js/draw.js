var selectedCell;


$(document).ready(function () {

    drawGrid();

    addCellClickBehavior(); // flag current cell selected
    addKeysClickBehavior();

});

function drawGrid() {

    var grid = $('#grid');
    var board = $('div.keyboard');

    grid.empty();

    const TOP_NAV_HEIGHT = 78;

    var grid_width = grid.width();
    var grid_height = board.height() + TOP_NAV_HEIGHT;

    var cell = "<td class='cell'></td>";

    for (let i = 0; i <= grid_height; i += 60) {
        for (let j = 60; j <= grid_width; j += 60) {
            grid.append(cell);
        }
    }

    $(window).resize(function () {
        drawGrid();
    });
}


function addCellClickBehavior() {
    $("#grid td.cell").each(function () {
        $(this).click(function () {
            flagCell($(this));
        });
    });
}

function flagCell(cell) {

    cell.addClass("cell-selected");
    if (selectedCell && cell !== selectedCell) {
        selectedCell.removeClass("cell-selected");
    }
    selectedCell = cell;
}

function deleteSelectedCell() {
    if (selectedCell) {
        selectedCell.html("");
        if (selectedCell.prev("a.key-cloned")) {
            flagCell(selectedCell.prev("a.key-cloned"));
        }
    }
}
function addKeysClickBehavior() {

    // all keys
    $('ul.qwerty li a').click(function () {
        copyKeyToSelectedCell(this);
    });

    // delete key
    $('#delete-key').click(function () {
        deleteSelectedCell();
    });

}

function copyKeyToSelectedCell(element) {
    if (selectedCell) {
        selectedCell.html($(element).clone().addClass("key-cloned"));
        if (selectedCell.next("td.cell")) {
            flagCell(selectedCell.next("td.cell"));
        }
    }
}
