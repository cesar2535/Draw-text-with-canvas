(function () {
  'use strict';

  window.requestAnimationFrame = (function (callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || 
      window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || 
      function (callback) {
        window.setTimeout(callback, 1000/ 60);
      };
  }) ();

  var KaraokeDrawer = function (canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
  };
  
  window.KaraokeDrawer = KaraokeDrawer;
}) ();