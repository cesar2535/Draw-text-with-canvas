(function () {
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

  var AudioPlayer = function () {
    this.player = document.getElementById('audio-player');
    this.currentState = PLAYER_STATE.IDLE;
    this.playlist = [];

    this.timer = undefined;
    this.timeSteps = 100;

    this.currentMediaDuration = 0;
    this.currentMediaTime = 0;

    this.init();
  };

  AudioPlayer.prototype.init = function() {
    if (this.player)
      throw new Error('No audio-player here!');

    this.initializeAudioEvents();
  };

  AudioPlayer.prototype.loadMedia = function() {
    this.player.src = this.playlist[0].src
    this.player.load();
  };

  AudioPlayer.prototype.playMedia = function() {
    if (this.playlist.length <= 0) {
      console.error('Playlist is empty');
      return;
    }

    if (!this.canPlayFlag) {
      console.error('No media can play (load)');
      return;
    }

    this.player.play();
  };

  AudioPlayer.prototype.nextMedia = function() {
    if (this.playlist.length <= 0) {
      console.error('Playlist is empty');
      return;
    }

    this.playlist.shift();

    if (this.playlist[0]) {
      this.loadMedia();
      this.playMedia();
    } else {
      console.error('No next media');
    }
  };

  AudioPlayer.prototype.initializeAudioEvents = function() {
    // During the loading process of an audio/video, the following events occur, in this order:
    this.player.addEventListener('loadstart', this.onLoadStartListener.bind(this));
    this.player.addEventListener('durationchange', this.onDurationChangeListener.bind(this));
    this.player.addEventListener('loadedmetadata', this.onLoadedMetadataListener.bind(this));
    this.player.addEventListener('loadeddata', this.onLoadedDataListener.bind(this));
    this.player.addEventListener('progress', this.onProgressListener.bind(this));
    this.player.addEventListener('canplay', this.onCanPlayListener.bind(this));
    this.player.addEventListener('canplaythrough', this.onCanPlayThroughListener.bind(this));
    // Loading process Ended

    this.player.addEventListener('timeupdate', this.onTimeUpdateListener.bind(this));
    this.player.addEventListener('play', this.onPlayListener.bind(this));
    this.player.addEventListener('pause', this.onPauseListener.bind(this));
    this.player.addEventListener('ended', this.onEndedListener.bind(this));
  };

  AudioPlayer.prototype.onLoadStartListener = function() {
    console.info('----- load start -----');
  };

  AudioPlayer.prototype.onDurationChangeListener = function() {
    console.info('----- duration change -----');
  };

  AudioPlayer.prototype.onLoadedMetadataListener = function() {
    console.info('----- loaded metadata -----');
  };

  AudioPlayer.prototype.onLoadedDataListener = function() {
    console.info('----- loaded data -----');
  };

  AudioPlayer.prototype.onProgressListener = function() {
    console.info('----- progress -----');
  };

  AudioPlayer.prototype.onCanPlayListener = function() {
    this.currentMediaDuration = this.player.duration;
    console.info('Current Source: ' + this.player.currentSrc);
  };

  AudioPlayer.prototype.onCanPlayThroughListener = function() {
    console.info('----- can play through -----');
  };

  AudioPlayer.prototype.onTimeUpdateListener = function() {

  };

  AudioPlayer.prototype.onPlayListener = function() {
    console.info('----- Play Media: ' + this.player.currentSrc + ' -----');
    this.currentState = PLAYER_STATE.PLAYING;
  };

  AudioPlayer.prototype.onPauseListener = function() {
    console.info('----- Media Pause -----');
    this.currentState = PLAYER_STATE.PAUSED;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }

  };

  AudioPlayer.prototype.onEndedListener = function() {
    console.info('----- Media Ended -----');
    if (this.playlist.length === 0)
      this.currentState = PLAYER_STATE.IDLE;
  };

}) ();