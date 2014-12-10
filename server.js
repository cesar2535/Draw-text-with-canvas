var parser = require('xml2json');
var fs = require('fs');

var readFileCallback = function (err, data) {
  var file_string = data.toString();
  jsonParser(file_string, 'test.json');
};

var writeFileCallback = function (err) {
  if (err) throw err;
  console.log('It\'s saved!');
};

var jsonParser = function (xmlFile, newFileName) {
  var json = parser.toJson(xmlFile);
  fs.writeFile(newFileName, json, writeFileCallback);
};

fs.readFile('lyrics/C00001.xml', readFileCallback);