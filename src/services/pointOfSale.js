'use strict';

var text = '';

const PointOfSale = {

    Display() {
        var text = this.getText()
        return text;    
    },

    Sale(barcode) {
        return this.onBarcode(barcode);
    },
    
    onBarcode(barcode) {
        if (barcode === '12345') {
            return this.setText('$7.95');
        } else if (barcode === '23456') {
            return this.setText('$12.50');
        } else if (barcode === '') {
            return this.setText('Scanning Error: Empty Barcode');
        } else {
            return this.setText(`Product not found for ${barcode}`)
        }
    },

    setText(newValue) {
        text = newValue
        return text;
    },

    getText() {
        return text
    }
}

module.exports = PointOfSale;



