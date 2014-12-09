(function () {
  'use strict';

  var KaraokeDrawer = function (canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
  };
  
  window.KaraokeDrawer = KaraokeDrawer;
}) ();