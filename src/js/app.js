
  window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, 1000 / 60);
      };
  })();

  var canvas = document.createElement('canvas');
  canvas.height = 100;
  canvas.width = 578;
  document.body.appendChild(canvas);
  var context = canvas.getContext('2d');
  var x = 10; //canvas.width / 2;
  var y = canvas.height / 2;
  var txt = 'All I need\'s a little love in my life';
  var w = 0;
  var clearH = 40;
  var clearY = 30;
  var clearX = 8;

  context.font = 'bold 2em sans-serif';
  // textAlign aligns text horizontally relative to placement
  context.textAlign = 'left';
  // textBaseline aligns text vertically relative to font style
  context.textBaseline = 'middle';
  context.lineWidth = 4;
  context.strokeStyle = 'black';

  function runText() {
    if (w > 500) {
      context.clearRect(clearX, clearY, w, clearH);
      w = 0;
    }
    if (w === 0) {
      context.fillStyle = 'lightblue';
      context.strokeText(txt, x, y);
      context.fillText(txt, x, y);
      context.fillStyle = 'red';
    }

    console.log('test')
    context.save();
    context.beginPath();
    context.clearRect(clearX, clearY, w+10, clearH);
    context.rect(clearX, clearY, w, clearH);
    context.clip();
    context.strokeStyle = 'white';
    context.strokeText(txt, x, y);
    context.fillText(txt, x, y);
    context.restore();

    w++;
    requestAnimFrame(runText);
  }

  runText();
