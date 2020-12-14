function Drag($) {
  var A = parseInt($("#editor").width(), 10),
    B = parseInt($("#tutorial").width(), 10),
    Y = parseInt($("#Y").width(), 10),
    minw = parseInt(((A + B + Y) * 10) / 100, 10),
    offset = $("#container").offset(),
    splitter = function (event, ui) {
      var aw = parseInt(ui.position.left),
        bw = A + B - aw;
      //set widths and information...
      $("#editor").css({ width: aw });
      $("#tutorial").css({ width: bw });
    };
  $("#Y").draggable({
    axis: "x",
    containment: "parent",
    drag: splitter,
  });

  $("#x").draggable({
    axis: "y",
    containment: "parent",
    drag: function (event, ui) {
      console.log(ui.position);
      $("#container").css({ top: ui.position.top });
      // $("#info").css({ height: ui.position.top * 2 });
      $("#container").css({
        height: window.innerHeight - 70 - ui.position.top,
      });
    },
  });
  //information...
  $("#width").text(A + B + Y);
  $("#container").css({
    height: window.innerHeight - 130,
  });
}

(function () {
  Drag($);
})();
