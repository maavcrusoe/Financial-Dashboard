//https://elrondscan.com/api/wallet/api/stake?addresses[]=xxxxx

//Current Amount Staking
function elrondExplorerStake(wallet) {
  var url = ("https://elrondscan.com/api/wallet/api/stake?addresses[]="+ wallet);
  var params = {
  'method': 'GET'
  };
  var response = UrlFetchApp.fetch(url, params);
  var data = response.getContentText();
  var json = JSON.parse(data);
  //Logger.log(json)
  var staked = json[0].userActiveStake
  var staked = staked / 1000000000000000000
  Logger.log(staked)
  return staked
}

//Current wallet balance
function elrondExplorerBalance(wallet) {
  var url = ("https://api.elrondscan.com/address/"+ wallet);
  var params = {
  'method': 'GET'
  };
  var response = UrlFetchApp.fetch(url, params);
  var d = response.getContentText();
  var json = JSON.parse(d);
  var staked = json.data.account.balance
  var staked = staked / 1000000000000000000
  Logger.log(staked)
  return staked
}


//Current Staking Rewards
function elrondExplorerClaim(wallet) {
  var url = ("https://elrondscan.com/api/wallet/api/stake?addresses[]="+ wallet);
  var params = {
  'method': 'GET'
  };
  var response = UrlFetchApp.fetch(url, params);
  var data = response.getContentText();
  var json = JSON.parse(data);
  var staked = json[0].claimableRewards
  var staked = staked / 1000000000000000000
  Logger.log(staked)
  return staked
}

//Using gateway of elrond APIs

//Wallet Amount balance
function elrondBalance(wallet) {
  var url = ("https://gateway.elrond.com/address/"+wallet+"/balance");
  var params = {
  'method': 'GET'
  };
  var response = UrlFetchApp.fetch(url, params);
  //Logger.log(response.getContentText());
  var data = response.getContentText();
  var json = JSON.parse(data);
  balance = json.data.balance
  Logger.log(balance)
  var balance = balance / 1000000000000000000
  return balance
}

// balance Tokens ESDT 
function elrondESDTbalance(wallet,esdt) {
  var url = ("https://gateway.elrond.com/address/"+wallet+"/esdt/");
  var params = {
  'method': 'GET'
  };
  var response = UrlFetchApp.fetch(url, params);
  var data = response.getContentText();
  var json = JSON.parse(data);
  //Logger.log(json)
  amount = json.data.esdts[esdt].balance;
  if (esdt == "QWT-46ac01")
    var balance = amount / 1000000;
  else
    var balance = amount / 1000000000000000000;
  Logger.log(balance);
  return balance;
}

//elrondESDTbalance("xxxxx","QWT-46ac01")

//list all esdts 
function elrondESDTList() {
  var url = ("https://gateway.elrond.com/network/esdts");
  var params = {
  'method': 'GET'
  };
  var response = UrlFetchApp.fetch(url, params);
  var data = response.getContentText();
  var json = JSON.parse(data);
  tokens = json.data.tokens
  Logger.log(tokens)
  Logger.log(data.count())
  return tokens
}


//get all tokens in wallet
function elrondTOKENSinWallet(wallet) {
  var wallet = "erd1hcj6x53ztuh20xhyezunnfhlteukvtz8e5pd8pqt55lnvyk6wnkq3788cp";
  var url = ("https://gateway.elrond.com/address/"+wallet+"/esdt/");
  var params = {
  'method': 'GET'
  };
  var response = UrlFetchApp.fetch(url, params);
  var data = response.getContentText();
  var json = JSON.parse(data);
  var tokens = json.data.esdts
  //Logger.log(Object.keys(tokens).length);
  var token = "";
  var amount = "";
  var sheet = SpreadsheetApp.getActiveSheet();
  for (var [key, value] of Object.entries(tokens)) {
      token += key +": " + value.balance + "\r\n"
      amount += value.balance
      var balance = amount / 1000000000000000000;
      sheet.appendRow([key,value.balance]);
  }
  
}
