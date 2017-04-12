'use strict';

const PointOfSale = {
    onBarcode(barcode) {
        return this.display()
    },

    display() {
        return "$7.95";
    }
}

export default PointOfSale;