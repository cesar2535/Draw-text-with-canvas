(function () {
  'use strict';
  function Start_CDGPlayer() {
    CDG_Player_init("cdg_audio", "cdg_canvas", "cdg_border", "cdg_status");
  };

  var zoom_mode = 0;

  function toggle_2x_mode() {
    zoom_mode = (~zoom_mode) & 0x01;
    var brdr = document.getElementById("cdg_border");
    var cnvs = document.getElementById("cdg_canvas");
    var audi = document.getElementById("cdg_audio");
    brdr.style.width = (zoom_mode) ? 648 + "px" : 324 + "px";
    cnvs.style.width = (zoom_mode) ? 576 + "px" : 288 + "px";
    brdr.style.height = (zoom_mode) ? 432 + "px" : 216 + "px";
    cnvs.style.height = (zoom_mode) ? 384 + "px" : 192 + "px";
    cnvs.style.padding = (zoom_mode) ? 24 + "px" : 12 + "px";
    audi.style.width = (zoom_mode) ? 648 + "px" : 324 + "px";
  };

  window.onload = Start_CDGPlayer;
}) ();