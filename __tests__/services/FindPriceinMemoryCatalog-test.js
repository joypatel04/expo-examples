import * as SaleItemController from './SellOneItemController-test';

var foundPrice = SaleItemController.Price.prototype.cents(0);

class Price {
  cents(barcode, PricesInCentsByBarcode) {
    return PricesInCentsByBarcode.get(barcode);
  }

  toString() {
    return "a price"
  }
}

class SaleController {
  findPrice(barcode, PricesInCentsByBarcode) {
    return Price.prototype.cents(barcode, PricesInCentsByBarcode)
  }
}

describe('FindPriceInMemoryCatalog Tests', () => {
  it('Product Found', () => {
    var PricesInCentsByBarcode = new Map();
    PricesInCentsByBarcode.set('12345', 0); 
    expect(SaleController.prototype.findPrice('12345', PricesInCentsByBarcode)).toEqual(0)
  });

  it('Product Found', () => {
    var PricesInCentsByBarcode = new Map(); 
    expect(SaleController.prototype.findPrice('12345', PricesInCentsByBarcode)).toEqual(undefined)
  });
});