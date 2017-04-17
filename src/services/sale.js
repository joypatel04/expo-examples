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
    var saleInProgress = !(price === null || price === undefined);
    if (!saleInProgress) {
      return Display.displayNoSaleInProgressMessage();
    } else {
      return Display.displayPurchaseTotal(price)
    }
  }

}

module.exports = Sale.prototype;



