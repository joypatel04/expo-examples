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
            this.setText('Scanning Error: Empty Barcode');
            return;
        }

        if (pricesByBarcode.has(barcode)) {
            this.setText(pricesByBarcode.get(barcode));
            return;
        } else {
            this.setText(`Product not found for ${barcode}`);
            return;
        }
    },

    setText(newValue) {
        text = newValue
    },
}

module.exports = PointOfSale;



