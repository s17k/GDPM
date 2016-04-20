function find_value_in_row(row, value) {
  for(var i=0;i<row.length;i++) {
    if(row[i] == value)
      return i;
  }
  return -1;
}

function blank_row(row, name_of_project_index) {
  return row[name_of_project_index] == "";
}

function fill_headers(row) {
  headers = {};
  for(var i=0;i<row.length;i++) {
    headers[row[i]] = i;
  }
  return headers;
}

function UPT_TZ2TP(url) {
  
}

function Update_from_single_TP(url, ZTP, row_index) {
  try {
    sheet = SpreadsheetApp.openByUrl(url);
  } catch(e) {
    Logger.log(e);
    return 1;
  }
  getData(sheet, ZTP, row_index);
  return 0;
}

function set_font_line(ZTP, i, str) {
  var r = ZTP.getRange("A:A");
  ZTP.getRange(r.getRow()+i,1,1,ZTP.getLastColumn()).setFontLine(str);
}


function clear_lines() {
 var ZTP = SpreadsheetApp.getActiveSheet();
  var ZTP_values = ZTP.getDataRange().getValues();
  for(var i=0;i<ZTP_values.length;i++) {
   set_font_line(ZTP, i, ''); 
  }
}

function UPT_ZTP() {
  var ZTP = SpreadsheetApp.getActiveSheet();
  var ZTP_values = ZTP.getDataRange().getValues();
  var headers_row = 9;
  var headers = fill_headers(ZTP_values[headers_row]);
  
  for(var i=headers_row+2;i<ZTP_values.length;i++) {
    if(!blank_row(ZTP_values[i], headers['URL'])) {
      UPT_TZ2TP(ZTP_values[i][headers['URL']]);
      result = Update_from_single_TP(ZTP_values[i][headers['URL']], ZTP, i);
      Logger.log(ZTP_values[i][headers['Nazwa projektu']]);
      if(result == 1) {
        set_font_line(ZTP, i, 'line-through');
      } else {
        set_font_line(ZTP, i, '');
      }
    } else {
      set_font_line(ZTP, i, '');
    }
  }
}
