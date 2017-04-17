var PricesByBarcode = new Map();
PricesByBarcode.set('12345', '$7.95');
PricesByBarcode.set('23456', '$12.50');

class Catalog {
    findPrice(barcode) {
        return PricesByBarcode.get(barcode)
    }
}

module.exports = Catalog