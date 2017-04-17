'use strict';

import Catalog from './catalog';
import Display from './display';

var priceInCents;
var pendingPurchaseItemPrices = new Set();
   
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
      pendingPurchaseItemPrices.add(priceInCents)
      return Display.displayPrice(priceInCents);
    }

  }

  onTotal() {
    var noSaleInProgress = pendingPurchaseItemPrices.size === 0;
    if (noSaleInProgress) {
      return Display.displayNoSaleInProgressMessage();
    } else {
      return Display.displayPurchaseTotal(this.pendingPurchaseTotal());
    }
  }

  pendingPurchaseTotal() {
    var prices = pendingPurchaseItemPrices.values()
    return prices.next().value;
  }

  parsePriceInCents(scannedPrice) {
    var price = scannedPrice.replace(/[^\d.-]/g, '');
    return Number(price);
  }

}

module.exports = Sale.prototype;



