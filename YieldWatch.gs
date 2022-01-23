//https://www.yieldwatch.net/api/all/0x889E5A2c3d890Df6007AC048d010f751724F63b0?platforms=pancake,biswap

//var vault = "biswap";
//var wallet = "xxxx";

//Get rewards in USD pending on Biswap
function BSWpendingRewardsInUSD(wallet, vault) {
  var url = ("https://www.yieldwatch.net/api/all/"+wallet+"?platforms="+vault+"");
  var params = {
  'method': 'GET'
  };
  var response = UrlFetchApp.fetch(url, params);
  var data = response.getContentText();
  var json = JSON.parse(data);
  var pools = json.result; 

  var stakingCurrentTokens = json.result.Biswap.vaults.vaults[0].currentTokens;
  var stakingRecentProfit = json.result.Biswap.vaults.vaults[0].recentProfit;
  var stakingYield = json.result.Biswap.vaults.totalUSDValues.yield;
  var stakingDeposit = json.result.Biswap.vaults.totalUSDValues.deposit;

  var priceInUSDRewardToken = json.result.Biswap.LPStaking['vaults'][0].priceInUSDRewardToken;
  var totalRewards = json.result.Biswap.LPStaking['vaults'][0].totalRewards;
  var harvestedRewards = json.result.Biswap.LPStaking['vaults'][0].harvestedRewards;
  var pendingRewards = json.result.Biswap.LPStaking['vaults'][0].pendingRewards;
  var apr = json.result.Biswap.LPStaking['vaults'][0].poolInfo.apr;

  var total = json.result.Biswap.LPStaking.totalUSDValues.total;
  var deposit = json.result.Biswap.LPStaking.totalUSDValues.deposit;
  var yield = json.result.Biswap.LPStaking.totalUSDValues.yield;
  //var value = vaults[vault].balanceInToken
  //value = Math.round(value * 100) / 100

  var pendingRewardsInUSD = pendingRewards * priceInUSDRewardToken;
  Logger.log(pendingRewardsInUSD)
  value = Math.round(pendingRewardsInUSD * 100) / 100;
  return value
}

//Get Rewards in Biswap LP
function BSWLPTotalRewards(wallet, vault) {
  var url = ("https://www.yieldwatch.net/api/all/"+wallet+"?platforms="+vault+"");
  //Logger.log(url);
  var params = {
  'method': 'GET'
  };
  var response = UrlFetchApp.fetch(url, params);
  var data = response.getContentText();
  var json = JSON.parse(data);
  var pools = json.result;
  //Logger.log(json.result.Biswap.vaults.vaults[0].currentTokens) 

  var priceInUSDRewardToken = json.result.Biswap.LPStaking['vaults'][0].priceInUSDRewardToken;
  var totalRewards = json.result.Biswap.LPStaking['vaults'][0].totalRewards;
  var harvestedRewards = json.result.Biswap.LPStaking['vaults'][0].harvestedRewards;
  var pendingRewards = json.result.Biswap.LPStaking['vaults'][0].pendingRewards;
  var apr = json.result.Biswap.LPStaking['vaults'][0].poolInfo.apr;

  //var pendingRewardsInUSD = pendingRewards * priceInUSDRewardToken
  Logger.log(totalRewards);
  //value = Math.round(pendingRewardsInUSD * 100) / 100
  return totalRewards;
}

//Get Biswap staking
function BSWStaking(wallet, vault) {
  var url = ("https://www.yieldwatch.net/api/all/"+wallet+"?platforms="+vault+"");
  var params = {
  'method': 'GET'
  };
  var response = UrlFetchApp.fetch(url, params);
  var data = response.getContentText();
  var json = JSON.parse(data);

  var stakingCurrentTokens = json.result.Biswap.vaults.vaults[0].currentTokens;
  var stakingRecentProfit = json.result.Biswap.vaults.vaults[0].recentProfit;
  var stakingDepositedTokens = json.result.Biswap.vaults.vaults[0].depositedTokens;
  //var stakingYield = json.result.Biswap.vaults.totalUSDValues.yield
  //var stakingDeposit = json.result.Biswap.vaults.totalUSDValues.deposit

  //var staking = stakingCurrentTokens - stakingDepositedTokens 

  return stakingCurrentTokens

}

//Get Biswap staking pending in USD
function BSWStakingPendingInUSD(wallet, vault) {
  var url = ("https://www.yieldwatch.net/api/all/"+wallet+"?platforms="+vault+"");
  //Logger.log(url);
  var params = {
  'method': 'GET'
  };
  var response = UrlFetchApp.fetch(url, params);
  var data = response.getContentText();
  var json = JSON.parse(data);

  var stakingCurrentTokens = json.result.Biswap.vaults.vaults[0].currentTokens;
  var stakingRecentProfit = json.result.Biswap.vaults.vaults[0].recentProfit;
  var stakingDepositedTokens = json.result.Biswap.vaults.vaults[0].depositedTokens;
  return stakingRecentProfit
}

//Get Cake staking pending
function CakeStakingPending(wallet, vault) {
  var url = ("https://www.yieldwatch.net/api/all/"+wallet+"?platforms="+vault+"");
  var params = {
  'method': 'GET'
  };
  var response = UrlFetchApp.fetch(url, params);
  var data = response.getContentText();
  var json = JSON.parse(data);

  var stakingCurrentTokens = json.result.PancakeSwap.vaults.vaults[0].currentTokens;
  var stakingRecentProfit = json.result.PancakeSwap.vaults.vaults[0].recentProfit;
  var stakingDepositedTokens = json.result.PancakeSwap.vaults.vaults[0].depositedTokens;
  return stakingRecentProfit
}
