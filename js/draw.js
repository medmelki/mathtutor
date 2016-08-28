var selectedCell;

var columnsNumber = 0;
var rowsNumber = 0;


$(document).ready(function () {

    drawGrid(0, 0);

    addKeysClickBehavior();

    $(window).resize(function () {
        drawGrid(0, 0);
    });

});

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
        var board = $('div.keyboard');
        const TOP_NAV_HEIGHT = 78;
        grid_height = board.height() + TOP_NAV_HEIGHT;
    } else {
        grid_height = h;
    }

    var cell = "<td class='cell'></td>";

    for (let i = 0; i <= grid_height; i += 60) {
        columnsNumber = 0;
        for (let j = 60; j <= grid_width; j += 60) {
            grid.append(cell);
            columnsNumber++;
        }
        rowsNumber++;
    }
    addCellClickBehavior(); // flag current cell selected

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
        selectedCell.removeClass("filled-cell");
        if (selectedCell.prevAll("td.filled-cell:eq(0)")) {
            flagCell(selectedCell.prevAll("td.filled-cell:eq(0)"));
        }
    }
}

function returnSelectedCell() {
    if (selectedCell.nextAll("td.cell:eq(" + (columnsNumber - 1) + ")")) {
        //drawGrid(0, $('div.keyboard').height() + 78 + 65);
        flagCell(selectedCell.nextAll("td.cell:eq(" + (columnsNumber - 1) + ")"));
    }

}

function addSpaceCell() {
    if (selectedCell.next("td.cell")) {
        flagCell(selectedCell.next("td.cell"));
    }
}

function addKeysClickBehavior() {

    // all keys
    $('ul.qwerty li a').unbind("click");
    $('ul.qwerty li a').click(function () {
        copyKeyToSelectedCell(this);
    });

    addSpecialKeysClickBehavior();

}

function copyKeyToSelectedCell(element) {
    if (selectedCell) {
        selectedCell.html($(element).clone().addClass("key-cloned"));
        selectedCell.addClass("filled-cell");
        if (selectedCell.next("td.cell")) {
            flagCell(selectedCell.next("td.cell"));
        }
    }
}

function addSpecialKeysClickBehavior() {
    var specialKeys = ['a.delete-key', 'a.return-key', 'a.space-key'];
    $.each(specialKeys, function (i, v) { // unbind click event
        $(v).unbind("click");
    });

    // delete key
    $(specialKeys[0]).click(function () {
        deleteSelectedCell();
    });
    // return key
    $(specialKeys[1]).click(function () {
        returnSelectedCell();
    });
    // space key
    $(specialKeys[2]).click(function () {
        addSpaceCell();
    });
}

