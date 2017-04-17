// import Sale from './../../src/services/sale';
// import Catalog from './../../src/services/catalog';
// import Display from './../../src/services/display';

class Price {
  cents(centsValue) {
    return centsValue;
  }

  toString() {
    return "a price"
  }
}

var irrelevantPrice;

class SaleController {
  onBarcode(barcode, price) {
    if (barcode === '') {
      return Display.prototype.displayEmptyBarcodeMessgae();
    } 
    
    if (price === null) {
      return Display.prototype.displayProductNotFoundMessage();
    } else {
      return Display.prototype.displayPrice(Catalog.prototype.findPrice(barcode, price)); 
    }
    
  }
}

class Catalog {
  findPrice(barcode, price) {
    return irrelevantPrice = price
  }
}

class Display {
  setPrice(text) {
    return irrelevantPrice = Price.prototype.cents(text);
  }

  displayPrice(centsValue) {
    return Price.prototype.cents(centsValue);
  }

  displayProductNotFoundMessage() {
    return '::product not found::';
  }
  
  displayEmptyBarcodeMessgae() {
    return 'No Sell in Process';
  }
}



describe('SaleOneItemController Tests', () => {
  it('Product Found', () => { 
    expect(SaleController.prototype.onBarcode('12345', 795)).toEqual(795)
  });

  it('Product Not Found', () => {
    expect(SaleController.prototype.onBarcode('::product not found::', null)).toEqual('::product not found::')
  });

  it('Empty Barcode', () => {
    expect(SaleController.prototype.onBarcode('', null)).toEqual('No Sell in Process')
  });
});