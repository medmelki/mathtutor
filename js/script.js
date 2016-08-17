

$(document).ready(function () {

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

function addAlphabeticKeyboard() {

}