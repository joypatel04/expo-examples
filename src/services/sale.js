'use strict';

import Catalog from './catalog';
import Display from './display';

var priceInCents;
var scannedPrices = new Set();
   
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
      scannedPrices.add(priceInCents)
      return Display.displayPrice(priceInCents);
    }

  }

  onTotal() {
    var saleInProgress = !(scannedPrices.size === 0);
    if (!saleInProgress) {
      return Display.displayNoSaleInProgressMessage();
    } else {
      var prices = scannedPrices.values()
      return Display.displayPurchaseTotal(Display.format(prices.next().value));
    }
  }

  parsePriceInCents(scannedPrice) {
    var price = scannedPrice.replace(/[^\d.-]/g, '');
    return Number(price);
  }

}

module.exports = Sale.prototype;



