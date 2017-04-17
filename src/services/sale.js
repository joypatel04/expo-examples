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

    scannedPrice = Catalog.findPrice(barcode)
    
    if (scannedPrice === null || scannedPrice === undefined) {
      return Display.displayProductNotFoundMessage(barcode);
    } else {
      // scannedPricesInCents.push(this.parsePriceInCents(scannedPrice));
      return Display.displayPrice(this.formatMonetaryAmount(scannedPrice));
    }
  }

  onTotal() {
    var saleInProgress = !(scannedPrice === null || scannedPrice === undefined);
    if (!saleInProgress) {
      return Display.displayNoSaleInProgressMessage();
    } else {
      return Display.displayPurchaseTotal(this.formatMonetaryAmount(scannedPrice));
    }
  }

  parsePriceInCents(scannedPrice) {
    var price = scannedPrice.replace(/[^\d.-]/g, '');
    return Number(price);
  }

  formatMonetaryAmount(price) {
    return price;
  }

}

module.exports = Sale.prototype;



