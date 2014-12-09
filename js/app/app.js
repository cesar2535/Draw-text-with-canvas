(function () {
  'use strict';

  var KaraokeRender = function (canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext('2d');
  };

}) ();