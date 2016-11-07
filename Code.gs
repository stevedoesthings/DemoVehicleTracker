var FileNameString = "History";

// Open the file
  var FileIterator = DriveApp.getFilesByName(FileNameString);
  while (FileIterator.hasNext())
  {
    var file = FileIterator.next();
    if (file.getName() == FileNameString)
    {
      var ss = SpreadsheetApp.open(file);
      var fileID = file.getId();
    }    
  }

//var ssCount = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1CIA6sQHmhz_4pGbDNHtNcIEoh9zK-wg9X994qZE3lxg/edit#gid=1341947303');

function doGet(e) {

  if (!e.parameter.page) {
    return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  }
  return HtmlService.createTemplateFromFile(e.parameter['page'])
  .evaluate()
  .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

function lookUpLatLongFromSheetOneByOne() {
  var demoTrackingSheet = ss.getSheetByName("History");
  var resultsColumnValues = demoTrackingSheet.getRange('H2:'+demoTrackingSheet.getLastRow()).getValues();
  var resultsColumnValuesLen = resultsColumnValues.length;
  var latLongValues = [];
  var range1;
  var i = 0;
  
  for ( i; i < resultsColumnValuesLen; i++ ) {
    if ( typeof resultsColumnValues[i] !== 'undefined' ) {
      if ( resultsColumnValues[i].indexOf('Ignition Off') > -1 || resultsColumnValues[i].indexOf('Ignition On') > -1 ){
        range1 = demoTrackingSheet.getRange('I' + (i+2)).getValue();
        if ( range1 == "" ) {
          latLongValues.push(demoTrackingSheet.getRange('E' + (i+2) + ':F' + (i+2)).getValues());
          break;
        } else { continue; }
      }
    }
  }
  if ( latLongValues == "" ) {
    latLongValues = "end of page";
  }
  return latLongValues;
}

function updateSheet(locationname) {
  
  var demoTrackingSheet = ss.getSheetByName("History");
  var resultsColumnValues = demoTrackingSheet.getRange('H2:'+demoTrackingSheet.getLastRow()).getValues();
  var resultsColumnValuesLen = resultsColumnValues.length;
  var latLongValues = [];
  var locationNameRange, locationNameRangeVal, locationRowRange;
  var i = 0;
  
  
  for ( i; i < resultsColumnValuesLen; i++ ) {
    if ( typeof resultsColumnValues[i] !== 'undefined' ) {
      if ( resultsColumnValues[i].indexOf('Ignition Off') > -1 || resultsColumnValues[i].indexOf('Ignition On') > -1 ){
        locationNameRange = demoTrackingSheet.getRange('I' + (i+2));
        locationNameRangeVal = locationNameRange.getValue();
        if ( locationNameRangeVal == "" ) {
          locationNameRange.setValue(locationname);
          locationRowRange = demoTrackingSheet.getRange("A" + (i+2) + ":I" + (i+2));
          locationRowRange.setBackground("#D8E4BC");
          break;
        } else { continue; }
      }
    }
  }
  return;
}