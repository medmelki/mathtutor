$(document).ready(function () {

    $('#keyboard_icon').click(function () {
        toggleAlphabeticKeyboard();
    });

    //drawGraph();
});

function drawGraph() {
    var quickplot = new QuickPlot(document.getElementById("canvas"));
    quickplot.setFunction(function (x) {
        return Math.pow(x, 2)
    });
    quickplot.setGraphDomain(-2, 2);
    quickplot.setGraphRange(-1, 3);
    quickplot.drawGraph();
}

function toggleAlphabeticKeyboard() {

    var keys = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
        'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    var content = "<li><a class='key'><span>$key</span></a></li>";

    $("ul.qwerty li").toggle();

    if (!$("ul.qwerty li").is(":visible")) {
        // show alphabet keyboard
        for (var i = 0; i < keys.length; i++) {
            if (i < 12) {
                $("div.keyboard-left ul.qwerty").append(content.replace("$key", keys[i])).show();

            } else {
                $("div.keyboard-right ul.qwerty").append(content.replace("$key", keys[i])).show();
            }
        }
    }

    copyKeyToSelectedCell();
}