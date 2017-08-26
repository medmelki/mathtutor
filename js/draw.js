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
        selectedCell.removeClass("filled-cell rooted-cell divided-cell");
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
        if (isIndexingMode(previousFilledCell)) {

            let keyValueWrapped = '<sup>' + $(this).text() + '</sup>';
            if (previousFilledCell.data("indexingDownApplied")) {
                keyValueWrapped = keyValueWrapped.replace('sup', 'sub');
            }
            let replaceValue = '<span>$2' + keyValueWrapped + '<\/span>';

            if (previousFilledCell.data("indexingUpLeftApplied")) {
                replaceValue = '<span>' + keyValueWrapped + '$2<\/span>';
            }
            if (previousFilledCell.data("rootIndexingApplied")) {
                replaceValue = '<span class="root-indexed-span ">' + keyValueWrapped + '$2<\/span>';
            }
            previousFilledCell.html(
                previousFilledCell.html()
                    .replace(
                        /<span( class="root-span")?>(.*)<\/span>/,
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
    let specialKeys = ['#repeater-key', '#degrees-key', '#indexingUpRight-key', '#indexingUpLeft-key',
        '#indexingDown-key', '#squareRoot-key', '#rootIndexing-key', '#longDivision-key', '#fractions-key'];
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
                        '<span>$1�<\/span>'
                    )
            );
            previousFilledCell.data("degreesApplied", true);
        }
    });

    // indexingUpRightkey
    $(specialKeys[2]).click(function () {
        let previousFilledCell = getPreviousFilledCell();
        // toggle indexing mode for keyboards
        previousFilledCell.data("indexingUpRightApplied", !previousFilledCell.data("indexingUpRightApplied"));
    });

    // indexingUpLeft key
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

    // rootIndexing key
    $(specialKeys[6]).click(function () {
        let previousFilledCell = getPreviousFilledCell();
        previousFilledCell.data("rootIndexingApplied", !previousFilledCell.data("rootIndexingApplied"));
    });

    // longDivision key
    $(specialKeys[7]).click(function () {
        divisionMode = !divisionMode;
        if (divisionMode) {
            copyKeyToSelectedCell(this);
        } else {
            getCurrentCell().removeClass('divided-cell');
        }
    });

    // fractions key
    $(specialKeys[8]).click(function () {
        if (!fractionMode) {
            fractionMode = !fractionMode;
            fractionUp = true;
        } else {
            if (fractionUp) {
                fractionUp = false;
                fractionDown = true;
            }
            else if (fractionDown) {
                fractionDown = false;
                fractionMode = false;
                flagCell(getNextCell());
            }
            // copyKeyToSelectedCell(this);
        }
    });
}

