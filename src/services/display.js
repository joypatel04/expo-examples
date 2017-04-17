var text = '';

class Display {

  setText(value) {
    text = value
    return text;
  }

  getText() {
    return text;
  }

  displayPrice(priceAsText) {
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
  
}

module.exports = Display.prototype;