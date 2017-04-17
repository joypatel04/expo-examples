'use strict';

import Catalog from './catalog';
import Display from './display';

var priceInCents;
var pendingPurchaseItemPrices = [];
   
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
      pendingPurchaseItemPrices.push(priceInCents);
      // console.log(`Pending Array: ${pendingPurchaseItemPrices}`)
      return Display.displayPrice(priceInCents);
    }

  }

  onTotal() {
    var noSaleInProgress = pendingPurchaseItemPrices.length === 0;
    if (noSaleInProgress) {
      return Display.displayNoSaleInProgressMessage();
    } else {
      return Display.displayPurchaseTotal(this.pendingPurchaseTotal());
    }
  }

  pendingPurchaseTotal() {
    return this.computePurchaseTotal(pendingPurchaseItemPrices);
  }

  computePurchaseTotal(pendingPurchaseItemPrices) {
    return pendingPurchaseItemPrices.reduce(this.sum, 0)
  }

  sum(a, b) {
      return a + b;
  }
  
  parsePriceInCents(scannedPrice) {
    var price = scannedPrice.replace(/[^\d.-]/g, '');
    return Number(price);
  }

  emptyPendingPurchaseItemPrices() {
    pendingPurchaseItemPrices = [];
  }

}

module.exports = Sale.prototype;



