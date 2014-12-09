(function () {
  'use strict';

  var KaraokePlayer = function (canvasId, playerId) {
    this.canvas = undefined;
    this.player = undefined;
    this.drawer = undefined;

    this.initial(canvasId, playerId);
  };

  KaraokePlayer.prototype.initial = function (canvasId, playerId) {
    this.canvas = document.getElementById(canvasId);
    this.player = document.getElementById(playerId);
    this.drawer = new KaraokeDrawer(this.canvas);
  };

  KaraokePlayer.prototype.initializeAudioEvents = function() {

  };

  window.KaraokePlayer = KaraokePlayer;
}) ();