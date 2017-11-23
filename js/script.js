$(document).ready(function () {

  $('#keyboard_icon').click(function () {
    toggleAlphabeticKeyboard();
  });

  addScrollButtonsBehavior();
  addSelectionButtonBehavior();

  //drawGraph();
});


function toggleAlphabeticKeyboard() {

  var keys = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
    'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  var content = "<li><a class='key'><span>$key</span></a></li>";

  var special_keys_content = "<li><a class='key space-key'><span class='key-span' style='background: url(\"img\/keys\/space%20bar.png\");'></span></a></li><li><a class='key return-key'><span class='key-span' style='background: url(\"img\/keys\/return.png\");'></span></a></li> <li><a class='key delete-key'><span class='key-span' style='background: url(\"img\/keys\/delete%20backspace.png\");'></span></a></li>";

  $("ul.qwerty li").toggle();

  if (!$("ul.qwerty li").is(":visible")) {
    // show alphabet keyboard
    for (var i = 0; i < keys.length; i++) {
      if (i < 14) {
        $("div.keyboard-left ul.qwerty").append(content.replace("$key", keys[i])).show();

      } else {
        $("div.keyboard-right ul.qwerty").append(content.replace("$key", keys[i])).show();
      }
    }
    $("div.keyboard-right ul.qwerty").append(special_keys_content);
  }
  $("ul.qwerty li a").unbind("click");
  $("ul.qwerty li a").click(function () {
    copyKeyToSelectedCell(this);
  });
  addSpecialKeysClickBehavior();

}

function addScrollButtonsBehavior() {
  $('#scrollDown').click(function () {
    var y = $(window).scrollTop();
    $(window).scrollTop(y + 50);
  });
  $('#scrollUp').click(function () {
    var y = $(window).scrollTop();
    $(window).scrollTop(y - 50);
  });
}

function addSelectionButtonBehavior() {
  $("#select-btn").click(function () {
    if (multiSelect) {
      $("#select-btn span").css('color', 'rgb(153, 1, 0)');
      multiSelect = false;
      for (var i = 0; i < selectedCells.length; i++) {
        selectedCells[i].removeClass("cell-selected");
      }
      selectedCells = [];
    } else {
      $("#select-btn span").css('color', 'black');
      multiSelect = true;

    }
  });
}