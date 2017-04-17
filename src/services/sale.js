'use strict';

import Catalog from './catalog';
import Display from './display';

var priceInCents;
   
class Sale {
  
  onBarcode(barcode) {
    var item = {};
    
    if ('' === barcode) {
      return Display.displayEmptyBarcodeMessage();
    }

    priceInCents = Catalog.findPrice(barcode);
    
    if (priceInCents === null || priceInCents === undefined) {
      return Display.displayProductNotFoundMessage(barcode);
    } else {
      var scannedPrice = Catalog.format(priceInCents)
      return Display.displayPrice(scannedPrice);
    }

  }

  onTotal() {
    var saleInProgress = !(priceInCents === null || priceInCents === undefined);
    if (!saleInProgress) {
      return Display.displayNoSaleInProgressMessage();
    } else {
      var scannedPrice = Catalog.format(priceInCents)
      return Display.displayPurchaseTotal(scannedPrice);
    }
  }

  parsePriceInCents(scannedPrice) {
    var price = scannedPrice.replace(/[^\d.-]/g, '');
    return Number(price);
  }

}

module.exports = Sale.prototype;



