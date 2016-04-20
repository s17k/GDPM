Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(),0,1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
}
var dodaj_do_tabeli = function(nazwa, wartosc, akt, ZTP, data)
{
  var index = find_value_in_row(data[9], nazwa);
  ZTP.getDataRange().getCell(akt+1, index+1).setValue(wartosc);
}
function getData(TPsheet, ZTPsheet, aktualnywiersz) 
{
  var data=sheet.getDataRange().getValues();
  var ZTPdata=ZTPsheet.getDataRange().getValues();
  var id=data[1][4];
  var name=data[0][4];
  var status=data[4][4];
  var PM=data[3][4];
  var PID=data[7][4];
  var h=0-0;
  var kolumna=9;
  //liczenie godzin
  for (var i=0; i<data[9].length; i++)
  {
    if (data[9][i]=='h')
     {
      kolumna=i;
      break;
    }
  }
  for (var i=11; i<306; i++)
  {
    data[i][kolumna]=data[i][kolumna]-0;
    h+=data[i][kolumna];
  }
  var start=1000000000000000000;
  var wiersz=0;
  var kolumna=10;
  //liczenie startu
  for (var i=0; i<data[9].length; i++)
  {
    if (data[9][i]=='Start')
     {
      kolumna=i;
      break;
    }
  }
  for (var i=11; i<307; i++)
  {
    if (data[i][kolumna]!="" && start>data[i][kolumna].valueOf())
    {
      start=data[i][kolumna].valueOf();
      wiersz=i;
    }
  }
  start=data[wiersz][kolumna];
  var end=0;
  var kolumna=11;
  //liczenie końca
  for (var i=0; i<data[9].length; i++)
  {
    if (data[9][i]=='Start')
    {
      kolumna=i;
      break;
    }
  }
  for (var i=11; i<307; i++)
  {
    if (data[i][kolumna]!="" && end<data[i][kolumna].valueOf())
    {
      end=data[i][kolumna].valueOf();
      wiersz=i;
    }
  }
  end=data[wiersz][kolumna];
  var dni= "=M" + (aktualnywiersz+1) + "-L" + (aktualnywiersz+1);
  var planwykd=0;
  //aktualny tydzień
  var now=new Date();
  var week = now.getWeek();
  for (var i=0; i<1000; i++)
  {
    if (data[10][i]==week)
    {
      kolumna=i;
      break;
    }
  }
  planwykd=data[1][i];
  var wykd=data[2][11];
  var odchyld=planwykd-wykd;
  var planwykh=data[5][i];
  var wykh=data[6][11];
  var odchylh=planwykh-wykh;
  dodaj_do_tabeli("ID", id, aktualnywiersz, ZTPsheet, data);
  dodaj_do_tabeli("Nazwa projektu", name, aktualnywiersz, ZTPsheet, ZTPdata);
  dodaj_do_tabeli("status", status, aktualnywiersz, ZTPsheet, ZTPdata);
  dodaj_do_tabeli("Project manager", PM, aktualnywiersz, ZTPsheet, ZTPdata);
  dodaj_do_tabeli("PID", PID, aktualnywiersz, ZTPsheet, ZTPdata);
  dodaj_do_tabeli("h", h, aktualnywiersz, ZTPsheet, ZTPdata);
  dodaj_do_tabeli("Start", start, aktualnywiersz, ZTPsheet, ZTPdata);
  dodaj_do_tabeli("End", end, aktualnywiersz, ZTPsheet, ZTPdata);
  dodaj_do_tabeli("Dni", dni, aktualnywiersz, ZTPsheet, ZTPdata);
  dodaj_do_tabeli("% WYK D PLAN", planwykd, aktualnywiersz, ZTPsheet, ZTPdata);
  dodaj_do_tabeli("% WYK D", wykd, aktualnywiersz, ZTPsheet, ZTPdata);
  dodaj_do_tabeli("% WYK D ODCH", odchyld, aktualnywiersz, ZTPsheet, ZTPdata);
  dodaj_do_tabeli("% WYK h PLAN", planwykh, aktualnywiersz, ZTPsheet, ZTPdata);
  dodaj_do_tabeli("% WYK h", wykh, aktualnywiersz, ZTPsheet, ZTPdata);
  dodaj_do_tabeli("% WYK h ODCH", odchylh, aktualnywiersz, ZTPsheet, ZTPdata);
  for (var i=20; i<data[9].length; i++)
  {
    if (data[9][i]>0)
    {
      var index=find_value_in_row(ZTPdata[10], data[10][i]);
      if (index>=0)
        ZTPsheet.getDataRange().getCell(aktualnywiersz+1, index+1).setValue(data[306][i]);
    }
  }
}
