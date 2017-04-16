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
        selectedCell.removeClass("filled-cell rooted-cell");
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

function copyKeyToSelectedCell(element) {
    if (selectedCell) {
        selectedCell.html($(element).clone().addClass("key-cloned"));
        selectedCell.addClass("filled-cell");

        let nextCell = getNextCell();
        if (getNextCell()) {
            flagCell(nextCell);
            if (rootMode) {
                nextCell.addClass('rooted-cell');
            }
        }
    }
}

function addKeysClickBehavior() {

    const $allKeys = $('ul.qwerty li a');

    addNormalKeysClickBehavior($allKeys);

    // indexing keys
    addIndexingKeysClickBehavior();

    // red special keys
    addSpecialKeysClickBehavior();

}

function addNormalKeysClickBehavior($allKeys) {
    $allKeys.unbind("click");
    $allKeys.click(function () {
        let previousFilledCell = getPreviousFilledCell();
        if (previousFilledCell.data("indexingUpRightApplied") ||
            previousFilledCell.data("indexingUpLeftApplied") ||
            previousFilledCell.data("indexingDownApplied")) {

            let keyValueWrapped = '<sup>' + $(this).text() + '</sup>';
            if (previousFilledCell.data("indexingDownApplied")) {
                keyValueWrapped = keyValueWrapped.replace('sup', 'sub');
            }
            let replaceValue = '<span>$1' + keyValueWrapped + '<\/span>';

            if (previousFilledCell.data("indexingUpLeftApplied")) {
                replaceValue = '<span>' + keyValueWrapped + '$1<\/span>';
            }
            previousFilledCell.html(
                previousFilledCell.html()
                    .replace(
                        /<span>(.*)<\/span>/,
                        replaceValue
                    )
            );
        } else {
            copyKeyToSelectedCell(this);
        }
    });
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
    let specialKeys = ['#repeater-key', '#degrees-key', '#indexingUpRight-key', '#indexingUpLeft-key', '#indexingDown-key', '#squareRoot-key'];
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

    // indexingUpRightRight key
    $(specialKeys[2]).click(function () {
        let previousFilledCell = getPreviousFilledCell();
        // toggle indexing mode for keyboards
        previousFilledCell.data("indexingUpRightApplied", !previousFilledCell.data("indexingUpRightApplied"));
    });

    // indexingUpLeftRight key
    $(specialKeys[3]).click(function () {
        let previousFilledCell = getPreviousFilledCell();
        previousFilledCell.data("indexingUpLeftApplied", !previousFilledCell.data("indexingUpLeftApplied"));
    });

    // indexingDown key
    $(specialKeys[4]).click(function () {
        let previousFilledCell = getPreviousFilledCell();
        previousFilledCell.data("indexingDownApplied", !previousFilledCell.data("indexingDownApplied"));
    });

    // squareRoot key
    $(specialKeys[5]).click(function () {
        rootMode = !rootMode;
        if (rootMode) {
            let element = $(this).clone();
            element.html(`<span class='root-span'>&radic;<\/span><\/a>`);
            copyKeyToSelectedCell(element[0]);
        } else {
            getCurrentCell().removeClass('rooted-cell');
        }
    });
}

