'use strict';

var text = ''
var PricesByBarcode = new Map();
PricesByBarcode.set('12345', '$7.95');
PricesByBarcode.set('23456', '$12.50');

class Display {

    setText(value) {
        text = value
        return text;
    }

    getText() {
        return text;
    }

    displayPrice(priceAsText) {
        return this.setText(priceAsText)
    }

    displayEmptyBarcodeMessage(){
        return this.setText('Scanning Error: Empty Barcode')
    } 
    
    displayProductNotFoundMessage(barcode) {
        return this.setText(`Product not found for ${barcode}`);
    }
}

class Catalog {
    findPrice(barcode) {
        return PricesByBarcode.get(barcode)
    }
}
   

class PointOfSale {

    Sale(barcode) {
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

module.exports = PointOfSale;



