var text = '';

class Display {

  setText(value) {
    text = value
    return text;
  }

  getText() {
    return text;
  }

  displayText(priceInCents) {
    return this.setText(priceInCents)
  }

  displayPrice(priceInCents) {
    return this.displayText(this.format(priceInCents));
  }

  displayEmptyBarcodeMessage(){
    return this.setText('Scanning Error: Empty Barcode')
  } 
  
  displayProductNotFoundMessage(barcode) {
    return this.setText(`Product not found for ${barcode}`);
  }

  displayNoSaleInProgressMessage() {
    return this.setText('No sale in progress. Try scanning a product');
  }

  displayPurchaseTotal(priceInCents) {
    return this.setText(`Total: ${this.format(priceInCents)}`)
  }

  format(price) {
    var price = parseFloat(price/100).toFixed(2)
    return `$${price.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
  }

}

module.exports = Display.prototype;