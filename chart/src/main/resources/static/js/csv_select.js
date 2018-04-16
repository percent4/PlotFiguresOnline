function flotFileData(file, i) {
  var reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function(event){
    var csv = event.target.result;
    var newData = $.csv.toArrays(csv, {
      onParseValue:$.csv.hooks.castToScalar
    });
    var data = flot.getData();
    data[i] = newData;
    flot.setData(data);
    flot.setupGrid();
    flot.draw();
  };
  reader.onerror = function(){ alert('Unable to read ' + file.fileName); };
}