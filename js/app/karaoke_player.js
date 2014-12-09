(function () {
  'use strict';

  var KaraokePlayer = function (canvasId, playerId) {
    this.canvas = document.getElementById(canvasId);
    this.player = document.getElementById(playerId);
    this.drawer = undefined;
  };

  KaraokePlayer.prototype.initial = function() {
    this.drawer = new KaraokeDrawer(this.canvas);
  };

  window.KaraokePlayer = KaraokePlayer;
}) ();