// Get FEED price
function GetFEEDPrice() {
  var url = "https://api.feeder.finance/v1/token";
  var params = {
  'method': 'GET'
  };
  var response = UrlFetchApp.fetch(url, params);
  var data = response.getContentText();
  var json = JSON.parse(data);
  var amount = json.feedPriceUsd;
  return amount
}

// Get all FEED holders
function GetFEEDholders() {
  var url = "https://api.feeder.finance/v1/token/holders";
  var params = {
  'method': 'GET'
  };
  var response = UrlFetchApp.fetch(url, params);
  var data = response.getContentText();
  var json = JSON.parse(data);
  var amount = json.holders
  return amount
}

// Get Feed Pool Balance
function GetFeedPOOLBalance(wallet, vault) {
  //var url = ("https://api-lb.feeder.finance/v1/userVault/"+wallet+""); OLD API
  var url = ("https://prod-feeder-api.herokuapp.com/v1/userVault/"+wallet+"");
  //Logger.log(url);
  var params = {
  'method': 'GET'
  };
  var response = UrlFetchApp.fetch(url, params);
  var data = response.getContentText();
  var json = JSON.parse(data);

  //Logger.log(json['vaults']);

  //var value = vaults[vault].balanceInToken;
  for(var key in json.vaults) {
      Logger.log(key)
      if(key.match(vault)) {
        Logger.log(json.vaults[key].balanceInToken);
        var value = json.vaults[key].balanceInToken;
      } 

  value = Math.round(value * 100) / 100
  Logger.log(value)
  return value; 
  }
}

function GetFeedAPY(wallet, vault) {
  var url = ("https://prod-feeder-api.herokuapp.com/v1/userVault/"+wallet+"");
  //Logger.log(url);
  var params = {
  'method': 'GET'
  };
  var response = UrlFetchApp.fetch(url, params);
  var data = response.getContentText();
  var json = JSON.parse(data);
  for(var key in json.vaults) {
      Logger.log(key)
      if(key.match(vault)) {
        Logger.log(json.vaults[key].apy);
        var value = json.vaults[key].apy * 100;
      } 

  Logger.log(value)
  return value; 
  }
}
