var selectedCell;


$(document).ready(function () {

    drawGrid();
    flagCurrentCell();

    copyKeyToSelectedCell();

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

function flagCurrentCell() {

    $("#grid td.cell").each(function () {
        $(this).click(function () {
            $(this).addClass("cell-selected");
            if (selectedCell && this !== selectedCell) {
                $(selectedCell).removeClass("cell-selected");
            }
            selectedCell = this;
        });
    });

}

function copyKeyToSelectedCell() {
    $('ul.qwerty li a').click(function () {
        if (selectedCell) {
            $(selectedCell).html($(this).clone().addClass("key-cloned"));
        }
    });
}
