//This is a custom function to retreivew all wanted balances and send me a telegram every x hours.

function checkCurrentPendingHarvestUSD() {
  var token = "XXXXXXX";
  var telegramUrl = "https://api.telegram.org/bot" + token;
  var chat_id = "XXXXXX"
  var app = SpreadsheetApp;
  var value = 0;
 
  //get prices of tokens wanted
  var priceCake = GetCoinmarketcap("CAKE");
  var priceEgld = GetCoinmarketcap("EGLD");
  //to get usd value hard mode
  var dataSheet = SpreadsheetApp.getActive().getSheetByName("VALORES");
  var usd = dataSheet.getRange(3,2).getValue(); //2 es columna > 3 es fila
  //Logger.log(usd)
  try {
    //execute all functions wanted
    var a = BSWLPTotalRewards("0x889e5a2c3d890df6007ac048d010f751724f63b0","biswap");  //biswap LP
    var b = BSWStaking("0x889e5a2c3d890df6007ac048d010f751724f63b0","biswap");  //biswap staking
    var c = CakeStakingPending("0x889e5a2c3d890df6007ac048d010f751724f63b0","pancake");    //cake staking
    var d = elrondExplorerClaim("erd1xgv38rga5gs6n3yf773zj9yz95vyfc83wgefhtllrg9ay2g8vnmseg5zus"); //egld staking legacy 
    var e = elrondExplorerClaim("erd1hcj6x53ztuh20xhyezunnfhlteukvtz8e5pd8pqt55lnvyk6wnkq3788cp"); //egld staking maiar

    //sum all values and multiply with each price
    value = (a + b + (c*priceCake) + ((d+e)*priceEgld))*usd;
    value = Math.round(value * 100) / 100
    Logger.log(value)

    //if withdrawal balance is more than 500 send me a telegram detailed
    if(value > 500)
      //compose msg
      var msg = ("Tienes para retirar: "+ value + " €");
      msg += ("BSW: " + b);
      msg += ("CAKE: " + c);
      msg += ("EGLD legacy: " + d);
      msg += ("EGLD maiar: " + e);
      sendMessage(token,msg)

  } catch (error) {
    //error time
    console.error(error);
    sendMessage(chat_id,error)
  }

}

//function to create a telegram wehbook 
function setWebhook() {
var url = telegramUrl + "/setWebhook?url=" + webAppUrl;
var response = UrlFetchApp.fetch(url);
}

//current function to send telegram
function sendMessage(chat_id,msg) {
  Logger.log(msg)
  //var url = telegramUrl + "/sendMessage?chat_id=" + chat_id + "&text="+ text;
  var url = "https://api.telegram.org/"+token+"/sendMessage?chat_id="+chat_id+"&text="+msg  
  var response = UrlFetchApp.fetch(url);
}
