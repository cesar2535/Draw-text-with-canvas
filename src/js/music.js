(function () {
  'use strict';

  var Timeline = function (tempo) {
    this.keyframes = [];
    this.time = tempo;
    this.interval = '';
    var self = this;

    this.addKeyframe = function (tempo, callback) {
      this.keyframes.push({
        time: tempo,
        fn: callback,
        ex: false
      });
    };

    this.start = function () {
      for (var i = 0, len = this.keyframes.length; i < len; i++) {
        setTimeout(this.keyframes[i].fn, this.keyframes[i].time);
      }
    };

    this.stop = function () {
      clearInterval(this.interval);
      console.log('Timeline parada.');
    };
  };

  var Music = function () {
    Timeline.call(this);
    audio = document.getElementById('audio-player');
    var self = this;

    this.start = function () {
      setInterval(function () {
        var tempo = Math.round(audio.currentTime * 1000);
        $(self.keyframes).each(function (key, val) {
          if (tempo >= val.time && val.ex) {
            val.fn();
            val.ex = true;
            console.log(val.time, tempo);
          }
        });
      }, 1);

      audio.play();
    };

    Music.prototype = Object.create(Timeline.prototype);


  };
}) ();