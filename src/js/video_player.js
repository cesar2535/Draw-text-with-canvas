(function() {
  'use strict';

  var PLAYER_STATE = {
    'IDLE': 'IDLE',
    'LOADING': 'LOADING',
    'LOADED': 'LOADED',
    'PLAYING': 'PLAYING',
    'PAUSED': 'PAUSED',
    'STOPPED': 'STOPPED',
    'SEEKING': 'SEEKING',
    'ERROR': 'ERROR'
  };

  var VideoPlayer = function() {
    this.player = document.getElementById('video-player');
    this.currentState = PLAYER_STATE.IDLE;
    this.playlist = [];
    this.loadedData = false;

    this.timer = undefined;
    this.timeSteps = 100;

    this.currentMediaDuration = 0;
    this.currentMediaTime = 0;

    this.init();
  };

  VideoPlayer.prototype.init = function() {
    if (!this.player)
      throw new Error('No audio-player here!');

    this.initializeAudioEvents();
  };

  VideoPlayer.prototype.loadMedia = function() {
    this.player.src = this.playlist[0].src;
    this.player.load();
  };

  VideoPlayer.prototype.playMedia = function() {
    if (this.playlist.length <= 0) {
      console.error('Playlist is empty');
      return;
    }

    if (!this.loadedData) {
      console.error('No media can play (load)');
      return;
    }

    this.player.play();
  };

  VideoPlayer.prototype.nextMedia = function() {
    if (this.playlist.length <= 0) {
      console.error('Playlist is empty');
      this.currentState = PLAYER_STATE.IDLE;
      return;
    }

    this.playlist.shift();

    if (this.playlist[0]) {
      this.loadMedia();
    } else {
      console.error('No next media');
      this.currentState = PLAYER_STATE.IDLE;
    }
  };

  VideoPlayer.prototype.addToPlaylist = function(file) {
    var oldLength = this.playlist.length;

    if (Array.isArray(file))
      this.playlist = this.playlist.concat(file);
    else
      this.playlist.push(file);

    if (oldLength <= 0) {
      this.loadMedia();
    }

  };

  VideoPlayer.prototype.initializeAudioEvents = function() {
    // During the loading process of an audio/video, the following events occur, in this order:
    this.player.addEventListener('loadstart', this.onLoadStartListener.bind(this));
    this.player.addEventListener('durationchange', this.onDurationChangeListener.bind(this));
    this.player.addEventListener('loadedmetadata', this.onLoadedMetadataListener.bind(this));
    this.player.addEventListener('loadeddata', this.onLoadedDataListener.bind(this));
    this.player.addEventListener('progress', this.onProgressListener.bind(this));
    this.player.addEventListener('canplay', this.onCanPlayListener.bind(this));
    this.player.addEventListener('canplaythrough', this.onCanPlayThroughListener.bind(this));
    // Loading process Ended

    this.player.addEventListener('error', this.onErrorListener.bind(this));
    this.player.addEventListener('timeupdate', this.onTimeUpdateListener.bind(this));
    this.player.addEventListener('play', this.onPlayListener.bind(this));
    this.player.addEventListener('pause', this.onPauseListener.bind(this));
    this.player.addEventListener('ended', this.onEndedListener.bind(this));
    this.player.addEventListener('volumechange', this.onVolumeChange.bind(this));
  };

  VideoPlayer.prototype.onLoadStartListener = function() {
    console.info('----- load start -----');
  };

  VideoPlayer.prototype.onDurationChangeListener = function() {
    console.info('----- duration change -----');
  };

  VideoPlayer.prototype.onLoadedMetadataListener = function() {
    console.info('----- loaded metadata -----');
  };

  VideoPlayer.prototype.onLoadedDataListener = function() {
    this.loadedData = true;
    this.currentMediaDuration = this.player.duration;
    console.info('----- loaded data: ' + this.player.currentSrc + ' -----');
    this.playMedia();
  };

  VideoPlayer.prototype.onProgressListener = function() {
    console.info('----- progress -----');
  };

  VideoPlayer.prototype.onCanPlayListener = function() {
    console.info('----- can play -----');
  };

  VideoPlayer.prototype.onCanPlayThroughListener = function() {
    console.info('----- can play through -----');
  };

  VideoPlayer.prototype.onErrorListener = function() {
    console.error('Loading Error');
  };

  VideoPlayer.prototype.onTimeUpdateListener = function() {

  };

  VideoPlayer.prototype.onPlayListener = function() {
    console.info('----- Play Media: ' + this.player.currentSrc + ' -----');
    this.currentState = PLAYER_STATE.PLAYING;

    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }

    this.timer = setInterval(this.onTimerListener.bind(this), this.timeSteps);
  };

  VideoPlayer.prototype.onPauseListener = function() {
    console.info('----- Media Pause -----');
    this.currentState = PLAYER_STATE.PAUSED;

    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  };

  VideoPlayer.prototype.onEndedListener = function() {
    console.info('----- Media Ended -----');
    this.nextMedia();
  };

  VideoPlayer.prototype.onVolumeChange = function() {
    console.info('----- volume change: ' + this.player.volume + ' -----');
  };

  VideoPlayer.prototype.onTimerListener = function() {
    this.currentMediaTime = this.player.currentTime;
    console.info('----- Current Time: ' + this.currentMediaTime + ' s -----');
  };

  window.VideoPlayer = VideoPlayer;
  window.vud = new VideoPlayer();

})();
