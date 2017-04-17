'use strict';

import Catalog from './catalog';
import Display from './display';

var scannedPrice;
   
class Sale {
  
  onBarcode(barcode) {
    var item = {};
    
    if ('' === barcode) {
      return Display.displayEmptyBarcodeMessage();
    }

    scannedPrice = Catalog.findPrice(barcode)
    if (scannedPrice === null || scannedPrice === undefined) {
      return Display.displayProductNotFoundMessage(barcode);
    } else {
      return Display.displayPrice(scannedPrice);
    }
  }

  onTotal() {
    var saleInProgress = !(scannedPrice === null || scannedPrice === undefined);
    if (!saleInProgress) {
      return Display.displayNoSaleInProgressMessage();
    } else {
      return Display.displayPurchaseTotal(scannedPrice)
    }
  }

}

module.exports = Sale.prototype;



