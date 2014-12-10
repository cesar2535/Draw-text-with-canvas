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
  
  KaraokeDrawer.prototype.drawText = function(text, color) {
    this.context.fillStyle = color;
    this.context.font =  "24px Helvetica";
    this.context.textAlign = "left";
    this.context.textBaseline = "top";
    this.context.fillText(text, 32, 32);
  };
  window.KaraokeDrawer = KaraokeDrawer;
}) ();