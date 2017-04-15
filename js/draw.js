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

function addNormalKeysClickBehavior($allKeys) {
    $allKeys.unbind("click");
    $allKeys.click(function () {
        let previousFilledCell = getPreviousFilledCell();
        if (previousFilledCell.data("indexingApplied")) {
            let keyValue = $(this).text();
            previousFilledCell.html(
                previousFilledCell.html()
                    .replace(
                        /<span>(.*)<\/span>/,
                        '<span>$1<sup>' + keyValue + '</sup><\/span>'
                    )
            );
        } else {
            copyKeyToSelectedCell(this);
        }
    });
}
function addKeysClickBehavior() {

    const $allKeys = $('ul.qwerty li a');

    addNormalKeysClickBehavior($allKeys);

    // indexing keys
    addIndexingKeysClickBehavior();

    // red special keys
    addSpecialKeysClickBehavior();

}

function copyKeyToSelectedCell(element) {
    if (selectedCell) {
        selectedCell.html($(element).clone().addClass("key-cloned"));
        selectedCell.addClass("filled-cell");
        let nextCell = selectedCell.next("td.cell");
        if (nextCell) {
            flagCell(nextCell);
        }
    }
}

function addSpecialKeysClickBehavior() {
    let specialKeys = ['a.delete-key', 'a.return-key', 'a.space-key'];
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
    let specialKeys = ['#repeater-key', '#degrees-key', '#indexing-key'];
    $.each(specialKeys, function (i, v) { // unbind click event
        $(v).unbind("click");
    });

    // repeater key
    $(specialKeys[0]).click(function () {
        let previousFilledCell = getPreviousFilledCell();
        if (!previousFilledCell.data("repeaterApplied")) {
            previousFilledCell.html(
                previousFilledCell.html()
                    .replace(
                        /<span>(.*)<\/span>/,
                        '<span>$1<sup>.</sup><\/span>'
                    )
            );
            previousFilledCell.data("repeaterApplied", true);
        }
    });
    // degrees key
    $(specialKeys[1]).click(function () {
        let previousFilledCell = getPreviousFilledCell();
        if (!previousFilledCell.data("degreesApplied")) {
            previousFilledCell.html(
                previousFilledCell.html()
                    .replace(
                        /<span>(.*)<\/span>/,
                        '<span>$1°<\/span>'
                    )
            );
            previousFilledCell.data("degreesApplied", true);
        }
    });
    // indexing key
    $(specialKeys[2]).click(function () {
        let previousFilledCell = getPreviousFilledCell();
        // toggle indexing mode for keyboards
        previousFilledCell.data("indexingApplied", !previousFilledCell.data("indexingApplied"));
    });
}

