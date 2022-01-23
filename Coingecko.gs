//get Coingecko prices
function GetCoingecoPrice(currency) {
  var url = ("https://api.coingecko.com/api/v3/simple/price?ids="+ currency +"&vs_currencies=eur");
  var params = {
  'method': 'GET'
  };
  var response = UrlFetchApp.fetch(url, params);
  var data = response.getContentText();
  var json = JSON.parse(data);
  var price = json[currency]['eur'];
  Logger.log(price);
  return price
}
