$(document).ready(function () {

    drawGrid(0, 0);

    addKeysClickBehavior();

    $(window).resize(function () {
        drawGrid(0, 0);
    });

});

function addCellClickBehavior() {
    $("#grid td.cell").unbind("click");
    $("#grid td.cell").each(function () {
        $(this).click(function () {
            flagCell($(this));
        });
    });
}

function deleteSelectedCell() {
    if (selectedCell) {
        selectedCell.html("");
        selectedCell.removeClass("filled-cell");
        flagCell(getPreviousFilledCell());
    }
}

function returnSelectedCell() {
    if (selectedCell.nextAll("td.cell:eq(" + (columnsNumber - 1) + ")")) {
        for (let j = cell_side; j <= $('#grid').width(); j += cell_side) {
            $('#grid').append("<td class='cell'></td>");
            rowsNumber++;
        }
        addCellClickBehavior(); // flag current cell selected
        flagCell(selectedCell.nextAll("td.cell:eq(" + (columnsNumber - 1) + ")"));
    }

}

function addSpaceCell() {
    if (selectedCell.next("td.cell")) {
        flagCell(selectedCell.next("td.cell"));
    }
}

function addKeysClickBehavior() {

    // all normal keys
    $('ul.qwerty li a').unbind("click");
    $('ul.qwerty li a').click(function () {
        copyKeyToSelectedCell(this);
    });

    // indexing keys
    addIndexingKeysClickBehavior();

    // red special keys
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

function addIndexingKeysClickBehavior() {
    var specialKeys = ['#repeater-key', '#degrees-key', '#indexing-key'];
    $.each(specialKeys, function (i, v) { // unbind click event
        $(v).unbind("click");
    });

    // repeater key
    $(specialKeys[0]).click(function () {
        deleteSelectedCell();
    });
    // degrees key
    $(specialKeys[1]).click(function () {
        returnSelectedCell();
    });
    // indexing key
    $(specialKeys[2]).click(function () {
        addSpaceCell();
    });
}

