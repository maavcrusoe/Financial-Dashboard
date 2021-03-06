//ELROND EXPLORER API
//https://elrondscan.com/api/wallet/api/stake?addresses[]=xxxxx

//Current Amount Staking
function elrondExplorerStake(wallet) {
  var url = ("https://elrondscan.com/api/wallet/api/delegation?addresses[]="+ wallet);
  var params = {
  'method': 'GET'
  };
  var amount = 0;
  var amountStaked = 0;
  var response = UrlFetchApp.fetch(url, params);
  var data = response.getContentText();
  var json = JSON.parse(data);
  //Logger.log(json[0])
  var json = json[0]

  for(var key in json) {
      //Logger.log(json[key].claimableRewards)
      var stakedMaiar = json[key].userActiveStake;
      amount = parseInt(amount) + parseInt(stakedMaiar);
      
      Logger.log(stakedMaiar);
    }

  amount = amount / 1000000000000000000;
  Logger.log("claimable rewards: "+amount)
  return amount;
}

//Current wallet balance
function elrondExplorerBalance(wallet) {
  var url = ("https://api.elrondscan.com/address/"+ wallet);
  var params = {
  'method': 'GET'
  };
  var response = UrlFetchApp.fetch(url, params);
  var d = response.getContentText();
  Logger.log(d)
  var json = JSON.parse(d);
  var staked = json.data.account.balance
  var staked = staked / 1000000000000000000
  Logger.log(staked)
  return staked
}


//Current Staking Rewards no delegation
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

//Current Staking Rewards only DELEGATION
function elrondExplorerClaimDELEGATION(wallet) {
  var url = ("https://elrondscan.com/api/wallet/api/delegation?addresses[]="+ wallet);
  var params = {
  'method': 'GET'
  };
  var amount = 0;
  var amountStaked = 0;
  var response = UrlFetchApp.fetch(url, params);
  var data = response.getContentText();
  var json = JSON.parse(data);
  //Logger.log(json[0])
  var json = json[0]

  for(var key in json) {
      //Logger.log(json[key].claimableRewards)
      var staked = json[key].claimableRewards;
      var stakedMaiar = json[key].userActiveStake;
      amount = parseInt(amount) + parseInt(staked);
      stakedMaiar = parseInt(amountStaked) + parseInt(stakedMaiar);
      
      Logger.log(staked);
    }

  var staked = staked / 1000000000000000000;
  amount = amount / 1000000000000000000;
  Logger.log("claimable rewards: "+amount)
  return amount;
}




//Using gateway of elrond APIs


//Legacy staking rewards
function elrondLegacyStakingRewards(wallet) {
  var url = ("https://api.elrond.com/accounts/"+ wallet +"/delegation-legacy");
  var params = {
  'method': 'GET'
  };
  var response = UrlFetchApp.fetch(url, params);
  //Logger.log(response.getContentText());
  var data = response.getContentText();
  var json = JSON.parse(data);
  balance = json.claimableRewards
  Logger.log(balance)
  var balance = balance / 1000000000000000000
  return balance
}

//Legacy staking 
function elrondLegacyStaking(wallet) {
  var url = ("https://api.elrond.com/accounts/"+ wallet +"/delegation-legacy");
  var params = {
  'method': 'GET'
  };
  var response = UrlFetchApp.fetch(url, params);
  //Logger.log(response.getContentText());
  var data = response.getContentText();
  var json = JSON.parse(data);
  balance = json.userActiveStake
  Logger.log(balance)
  var balance = balance / 1000000000000000000
  return balance
}


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
  var rangeA = sheet.getRange(17, 3,10);
  var rangeB = sheet.getRange(17, 4,10);
  for (var [key, value] of Object.entries(tokens)) {
      token += key +": " + value.balance + "\r\n"
      amount += value.balance
      var balance = amount / 1000000000000000000;
      sheet.appendRow([key,value.balance]);
      //rangeA.setValue(key);
      //rangeB.setValue(value.balance);
  }
  
}

//get current tokens in wallet by ticker
function elrondTOKENSinWalletByIentifier(wallet, search) {
  var token = "";
  var amount = 0 ;
  var balance = 0 ;
  var url = ("https://gateway.elrond.com/address/"+wallet+"/esdt/");
  var params = {
  'method': 'GET'
  };
  var response = UrlFetchApp.fetch(url, params);
  var data = response.getContentText();
  var json = JSON.parse(data);
  var tokens = json.data.esdts
  //Logger.log(Object.keys(tokens).length);
  for (var [key, value] of Object.entries(tokens)) {
    if(key.match(search)) {
      token += key +": " + value.balance + "\r\n";
      amount += (parseInt(value.balance) + parseInt(amount));
  
      Logger.log(key);
      Logger.log(value.balance);
    }
  }
  var balance = amount / 1000000000000000000;
  Logger.log(balance);
  return balance;
  
}
