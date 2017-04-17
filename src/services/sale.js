'use strict';

import Catalog from './catalog';
import Display from './display';
   
class Sale {

    saleItem(barcode) {
        return this.onBarcode(barcode);
    }
    
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

}

module.exports = Sale.prototype;



