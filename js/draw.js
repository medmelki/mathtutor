
$(document).ready(function () {

    drawGrill();
});
function drawGrill() {
    var board = $('#board');

    var board_width = board.width();
    var board_height = board.height();

    var cell = "<td class='cell'></td>";

    for (let i = 0; i <= board_height; i += 60) {
        for (let j = 60; j <= board_width; j += 60) {
            board.append(cell);
        }
    }
}
