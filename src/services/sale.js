'use strict';

import Catalog from './catalog';
import Display from './display';
   
class Sale {

    display() {
        return Display.prototype.getText();
    }

    saleItem(barcode) {
        return this.onBarcode(barcode);
    }
    
    onBarcode(barcode) {
        var item = {};
        
        if ('' === barcode) {
            return Display.prototype.displayEmptyBarcodeMessage();
        }

        var priceAsText = Catalog.prototype.findPrice(barcode)
        if (priceAsText === null || priceAsText === undefined) {
            return Display.prototype.displayProductNotFoundMessage(barcode);
        } else {
            return Display.prototype.displayPrice(priceAsText);
        }
    }

}

module.exports = Sale;



