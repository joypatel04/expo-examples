'use strict';

var text = '';
var PricesByBarcode = new Map();
PricesByBarcode.set('12345', '$7.95');
PricesByBarcode.set('23456', '$12.50');

const PointOfSale = {

    Display() {
        return text;    
    },

    Sale(barcode) {
        
        return this.onBarcode(barcode);
    },
    
    onBarcode(barcode) {
        var item = {};

        if ('' === barcode) {
            return this.setText('Scanning Error: Empty Barcode');
        } else if (PricesByBarcode.has(barcode)) {
            return this.setText(PricesByBarcode.get(barcode));
        } else {
            return this.setText(`Product not found for ${barcode}`)
        }
    },

    setText(newValue) {
        text = newValue
    },
}

module.exports = PointOfSale;



