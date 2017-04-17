var PricesAsTextByBarcode = new Map();
PricesAsTextByBarcode.set('12345', '$7.95');
PricesAsTextByBarcode.set('23456', '$12.50');
PricesAsTextByBarcode.set('1', '$8.50');
PricesAsTextByBarcode.set('2', '$12.75');
PricesAsTextByBarcode.set('3', '$3.30');
PricesAsTextByBarcode.set('23456', '$12.50');

var PricesInCentsByBarcode = new Map();

class Catalog {

  findPriceThenFotmatPrice(barcode) {
    var price = PricesAsTextByBarcode.get(barcode)
    return this.formatMonetaryAmount(price)
  }

  formatMonetaryAmount(price) {
    return price;
  }

  format(price) {
    var price = parseFloat(price/100).toFixed(2)
    return `$${price.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
  }

  parsePriceInCents(scannedPrice) {
    var price = scannedPrice.replace(/[^\d.-]/g, '');
    return PricesInCentsByBarcode.set(Number(price));
  }

}

module.exports = Catalog.prototype;