var text = '';

class Display {

  setText(value) {
    text = value
    return text;
  }

  getText() {
    return text;
  }

  displayText(priceAsText) {
    return this.setText(priceAsText)
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

  displayPurchaseTotal(price) {
    return this.setText(`Total: ${price}`)
  }

  format(price) {
    var price = parseFloat(price/100).toFixed(2)
    return `$${price.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
  }

}

module.exports = Display.prototype;