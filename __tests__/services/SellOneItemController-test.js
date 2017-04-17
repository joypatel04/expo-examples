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

var irrelevantPrice = Price.prototype.cents(795);

class SaleController {
  onBarcode(barcode) {
    return Display.prototype.displayPrice(Catalog.prototype.findPrice(barcode)) 
  }
}

class Catalog {
  findPrice(barcode) {
    return irrelevantPrice
  }
}

class Display {
  displayPrice(centsValue) {
    return Price.prototype.cents(centsValue);
  }
}



describe('SaleOneItemController Tests', () => {
  it('Product Found', () => {
    expect(SaleController.prototype.onBarcode('12345')).toEqual(Display.prototype.displayPrice(irrelevantPrice))
  });
});