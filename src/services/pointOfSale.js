'use strict';

var text = '';

const PointOfSale = {

    Display() {
        return text;    
    },

    Sale(barcode, pricesByBarcode) {
        return this.onBarcode(barcode, pricesByBarcode);
    },
    
    onBarcode(barcode, pricesByBarcode) {
        var item = {};
        if ('' === barcode) {
            return this.setText('Scanning Error: Empty Barcode');
        } else if (pricesByBarcode.has(barcode)) {
            return this.setText(pricesByBarcode.get(barcode));
        } else {
            return this.setText(`Product not found for ${barcode}`)
        }
    },

    setText(newValue) {
        text = newValue
    },
}

module.exports = PointOfSale;



