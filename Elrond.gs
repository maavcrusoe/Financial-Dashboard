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
  balance = json.data.esdts[esdt].balance
  if  (esdt == "QWT-46ac01")
    var balance = balance / 1000000
  else
    var amount = balance / 1000000000000000000
  
  Logger.log(balance)
  return balance
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
  return tokens
}
