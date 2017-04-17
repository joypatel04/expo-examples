'use strict';

import Catalog from './catalog';
import Display from './display';
   
class Sale {
  
  onBarcode(barcode) {
    var item = {};
    
    if ('' === barcode) {
      return Display.displayEmptyBarcodeMessage();
    }

    var priceAsText = Catalog.findPrice(barcode)
    if (priceAsText === null || priceAsText === undefined) {
      return Display.displayProductNotFoundMessage(barcode);
    } else {
      return Display.displayPrice(priceAsText);
    }
  }

  onTotal() {
    return Display.displayNoSaleInProgressMessage();
  }

}

module.exports = Sale.prototype;



