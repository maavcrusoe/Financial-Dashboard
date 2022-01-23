//price ✅
//volume_24h ✅
//percent_change_1h ✅

//if you need these more options only need to change *.price for .percent_change_7d or next one
//percent_change_7d
//fully_diluted_market_cap
//percent_change_30d 
//percent_change_90d


//Get our CMC API Key in our spreeadsheets
function GetConfigApiKeyCoinmarketcap() {
    var app = SpreadsheetApp;
    var activeSheet = app.getActiveSpreadsheet().getActiveSheet(); 
    var targetSheet = app.getActiveSpreadsheet().getSheetByName("YOUR PAGE HERE");
    var value = targetSheet.getRange(1, 6).getValue();
    Logger.log(value)
}

function SetValueIntoField() {
  var app = SpreadsheetApp;
  var activeSheet = app.getActiveSpreadsheet().getActiveSheet(); 
  var targetSheet = app.getActiveSpreadsheet().getSheetByName("YOUR PAGE HERE");
  targetSheet.getRange(1, 1).setValue("YOUR VALUE HERE");
  Logger.log("Inserted");
}

//Marketcap in 24h by coin
function GetCoinmarketcapVolume24hrs(currency) {
  var url = ("https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol="+currency);
  var params = {
  'method': 'GET',
  'muteHttpExceptions': true,
  'headers': {
    'X-CMC_PRO_API_KEY': 'XXXXXXX',
    'Accept': 'application/json'
    }
  };
  var response = UrlFetchApp.fetch(url, params);
  var data = response.getContentText();
  var json = JSON.parse(data);
  var volume_24h = json.data[currency].quote['USD'].volume_24h;
  Logger.log(volume_24h);
  return volume_24h;
}

//Get currency value listed on CMC
function GetCoinmarketcap(currency) {
  var url = ("https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=" + currency);
  Logger.log(currency);
  var params = {
  'method': 'GET',
  'muteHttpExceptions': true,
  'headers': {
    'X-CMC_PRO_API_KEY': 'XXXXXXX',
    'Accept': 'application/json'
    }
  };
  var response = UrlFetchApp.fetch(url, params);
  var data = response.getContentText();
  var json = JSON.parse(data);
  //Logger.log(json)
  var price = json.data[currency].quote['USD'].price;
  Logger.log(price);
  return price
}

//Get percent dif in 1h
function GetCoinmarketcapPercent1h(currency) {
  var url = ("https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol="+currency);
  var params = {
  'method': 'GET',
  'muteHttpExceptions': true,
  'headers': {
    'X-CMC_PRO_API_KEY': 'XXXXXXX',
    'Accept': 'application/json'
    }
  };
  var response = UrlFetchApp.fetch(url, params);
  var data = response.getContentText();
  var json = JSON.parse(data);
  var percent_change_1h = json.data[currency].quote['USD'].percent_change_1h;
  Logger.log(percent_change_1h);
  return percent_change_1h
}
