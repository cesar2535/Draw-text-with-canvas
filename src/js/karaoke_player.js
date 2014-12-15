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
    this.currentMediaTime = 0;
    this.currentMediaDuration = 0;

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

  KaraokePlayer.prototype.onLoadStartListener = function() {
    console.info('----- load start -----');
  };

  KaraokePlayer.prototype.onDurationChangeListener = function() {
    console.info('----- duration change -----');
  };

  KaraokePlayer.prototype.onLoadedMetadataListener = function() {
    console.info('----- loaded metadata -----');
  };

  KaraokePlayer.prototype.onLoadedDataListener = function() {
    console.info('----- loaded data -----');
  };

  KaraokePlayer.prototype.onProgressListener = function() {
    console.info('----- progress -----');
  };

  KaraokePlayer.prototype.onCanPlayListener = function() {
    console.info('----- can play -----');
  };

  KaraokePlayer.prototype.onCanPlayThroughListener = function() {
    console.info('----- can play through -----');
  };

  KaraokePlayer.prototype.onPlayListener = function() {
    
  };

  KaraokePlayer.prototype.onEndedListener = function() {

  };

  window.KaraokePlayer = KaraokePlayer;
}) ();