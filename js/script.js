var keyboard_shown;

$(document).ready(function () {
    //$('#keyboard').hide();

    //('#toolbar-bottom').hover(
    //    function () {
    //        $('.keyboard')[1].fadeIn();
    //    },
    //    function () {
    //        $('.keyboard')[1].fadeOut();
    //    }
    //);

    $('#keyboard_icon').click(function () {

        if (keyboard_shown) {
            $('#keyboard').hide(500);
            keyboard_shown = false;
        } else {
            $('#keyboard').show(500);
            keyboard_shown = true;
        }
    });
    var quickplot = new QuickPlot(document.getElementById("canvas"));
    quickplot.setFunction(function (x) {
        return Math.pow(x, 2)
    });
    quickplot.setGraphDomain(-2, 2);
    quickplot.setGraphRange(-1, 3);
    quickplot.drawGraph();
});