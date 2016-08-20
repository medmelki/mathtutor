$(document).ready(function () {

    drawGrid();
});
function drawGrid() {

    var grid = $('#grid');
    var board = $('div.keyboard');

    const TOP_NAV_HEIGHT = 78;

    var grid_width = grid.width();
    var grid_height = board.height() + TOP_NAV_HEIGHT;

    var cell = "<td class='cell'></td>";

    for (let i = 0; i <= grid_height; i += 60) {
        for (let j = 60; j <= grid_width; j += 60) {
            grid.append(cell);
        }
    }
}
