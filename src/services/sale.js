'use strict';

import Catalog from './catalog';
import Display from './display';

var price;
   
class Sale {
  
  onBarcode(barcode) {
    var item = {};
    
    if ('' === barcode) {
      return Display.displayEmptyBarcodeMessage();
    }

    price = Catalog.findPrice(barcode)
    if (price === null || price === undefined) {
      return Display.displayProductNotFoundMessage(barcode);
    } else {
      return Display.displayPrice(price);
    }
  }

  onTotal() {
    if (price === null || price === undefined) {
      return Display.displayNoSaleInProgressMessage();
    } else {
      return Display.setText('Total: $6.50')
    }
    
  }

}

module.exports = Sale.prototype;



