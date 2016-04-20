function find_value_in_row(row, value) {
  for(var i=0;i<row.length;i++) {
    if(row[i] == value)
      return i;
  }
  return -1;
}
function copyData()
{
  var active = SpreadsheetApp.getActiveSheet();
  var target = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("TP");
  var activedata = active.getDataRange().getValues();
  var targetdata = target.getDataRange().getValues();
  Logger.log(activedata[2][4]);
  Logger.log(targetdata[2][4]);
  var IDwiersz=find_value_in_row(activedata[9], "ID");
  var wykonwiersz=find_value_in_row(activedata[9], "Wykonawca");
  var zlec=16;//find_value_in_row(activedata[9], "Zlec");
  var wyk=19;//find_value_in_row(activedata[9], "Wyk");
  var kon=22;//find_value_in_row(activedata[9], "Kon");
  var odb=25;//find_value_in_row(activedata[9], "Odb");
  var aktualnywiersz=12;
  Logger.log(zlec + " " + wyk + " " + kon + " " + odb);
  for (var i=12; i<306; i++)
  {
    if (activedata[i][wykonwiersz]!="")
    {
      while (targetdata[aktualnywiersz][IDwiersz]!=activedata[i][IDwiersz])
      {
        aktualnywiersz++;
      }
      Logger.log("active " + i + " " + zlec + " " + activedata[i][zlec]);
      Logger.log("target " + i + " " + zlec + " " + targetdata[i][zlec]);
      target.getDataRange().getCell(i+1, zlec+1).setValue(activedata[i][zlec]);
      target.getDataRange().getCell(i+1, wyk+1).setValue(activedata[i][wyk]);
      target.getDataRange().getCell(i+1, kon+1).setValue(activedata[i][kon]);
      target.getDataRange().getCell(i+1, odb+1).setValue(activedata[i][odb]);
    }
  }
}
