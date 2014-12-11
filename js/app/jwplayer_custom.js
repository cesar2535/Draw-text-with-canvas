(function () {
  'use strict';

  var PLAYER_STATE = {
    'IDLE': 'IDLE',
    'BUFFERING': 'BUFFERING',
    'PLAYING': 'PLAYING',
    'PAUSED': 'PAUSED'
  };

  var JWplayer = function () {
    this.player = undefined;
    this.currentState = JWPLAYER_STATE.IDLE;

    // @type {Array} An array for the media playlist
    this.playlist = [];
    this.history = [];
    /** Schema for file
     *  {
     *    title: 'title',
     *    sources: [{
     *      file: 'file',
     *      label: '720p HD'
     *    }, {
     *      file: 'file',
     *      label: '360p SD'
     *    }]
     *  }
     **/

    // @type {Number} A number for current media duration
    this.currentMediaDuration = 0;
    this.currentMediaTime = 0;
  }

  JWplayer.prototype.setupJwplayer = function(container, setupConfig) {
    if (!jwplayer)
      throw new Error('Please add the jwplayer library');

    this.player = jwplayer(container).setup(setupConfig);
    this.initializeJwplayerEvents();
  };

  JWplayer.prototype.initializeJwplayerEvents = function() {
    this.player.onPlay(this.onPlayListener.bind(this));
    this.player.onPause(this.onPauseListener.bind(this));
    this.player.onBuffer(this.onBufferListener.bind(this));
    this.player.onIdle(this.onIdleListener.bind(this));
    this.player.onComplete(this.onCompleteListener.bind(this));
    this.player.onError(this.onErrorListener.bind(this));
  };

  JWplayer.prototype.onPlayListener = function(event) {
    this.currentState = JWPLAYER_STATE.PLAYING;
  };

  JWplayer.prototype.onPauseListener = function(event) {
    this.currentState = JWPLAYER_STATE.PAUSED;
  };

  JWplayer.prototype.onBufferListener = function(event) {
    this.currentState = JWPLAYER_STATE.BUFFERING;
  };

  JWplayer.prototype.onIdleListener = function(event) {
    this.currentState = JWPLAYER_STATE.IDLE;
  };

  JWplayer.prototype.onCompleteListener = function() {
    
  };

  JWplayer.prototype.onErrorListener = function(event) {
    console.error(event.message);
  };

  JWplayer.prototype.onPlaylistListener = function(event) {
    
  };

  JWplayer.prototype.addToPlaylist = function(file) {
    if (!file) {
      console.error('No file added');
      return;
    }

    if (Array.isArray(file)) {
      this.playlist.concat(file);
    } else {
      this.playlist.push(file);
    }
  };

}) ();