//create a custom menu on Google Spreadsheet

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('CUSTOM MENU')
      .addItem('Elrond', 'elrondTOKENSinWallet')
      .addItem('Pending Harvest', 'checkCurrentPendingHarvestUSD')
      .addToUi();
}

function helloWorld() {
  Browser.msgBox("Hello World!");
}
