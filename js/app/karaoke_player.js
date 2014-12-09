(function () {
  'use strict';

  var PLAYER_STATE = {
    'IDLE': 'IDLE'
  };

  var KaraokePlayer = function (canvasId, playerId) {
    this.canvas = undefined;
    this.player = undefined;
    this.drawer = undefined;
    this.queue = [];
    this.history = [];

    this.initial(canvasId, playerId);
  };

  KaraokePlayer.prototype.initial = function (canvasId, playerId) {
    this.canvas = document.getElementById(canvasId);
    this.player = document.getElementById(playerId);
    this.drawer = new KaraokeDrawer(this.canvas);
  };

  KaraokePlayer.prototype.initializeAudioEvents = function() {

  };

  KaraokePlayer.prototype.playMedia = function() {
    if (this.queue.length === 0) {
      console.error('No media can play');
      return;
    }
    

  };

  KaraokePlayer.prototype.onPlayListener = function() {
    
  };

  KaraokePlayer.prototype.onPauseListener = function() {

  };

  window.KaraokePlayer = KaraokePlayer;
}) ();