'use strict';

import Catalog from './catalog';
import Display from './display';

var scannedPrice;
var scannedPricesInCents = [];
   
class Sale {
  
  onBarcode(barcode) {
    var item = {};
    
    if ('' === barcode) {
      return Display.displayEmptyBarcodeMessage();
    }

    scannedPrice = Catalog.findPriceThenFotmatPrice(barcode)
    
    if (scannedPrice === null || scannedPrice === undefined) {
      return Display.displayProductNotFoundMessage(barcode);
    } else {
      // scannedPricesInCents.push(this.parsePriceInCents(scannedPrice));
      return Display.displayPrice(Catalog.formatMonetaryAmount(scannedPrice));
    }
  }

  onTotal() {
    var saleInProgress = !(scannedPrice === null || scannedPrice === undefined);
    if (!saleInProgress) {
      return Display.displayNoSaleInProgressMessage();
    } else {
      return Display.displayPurchaseTotal(Catalog.formatMonetaryAmount(scannedPrice));
    }
  }

  parsePriceInCents(scannedPrice) {
    var price = scannedPrice.replace(/[^\d.-]/g, '');
    return Number(price);
  }

}

module.exports = Sale.prototype;



