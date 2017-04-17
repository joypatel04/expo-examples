var PricesAsTextByBarcode = new Map();
PricesAsTextByBarcode.set('12345', 795);
PricesAsTextByBarcode.set('23456', 1250);
PricesAsTextByBarcode.set('1', 850);
PricesAsTextByBarcode.set('2', 1275);
PricesAsTextByBarcode.set('3', 330);
PricesAsTextByBarcode.set('23456', 1250);

var PricesInCentsByBarcode = new Map();
PricesInCentsByBarcode.set('12345', 795);
PricesInCentsByBarcode.set('23456', 1250);
PricesInCentsByBarcode.set('1', 850);
PricesInCentsByBarcode.set('2', 1275);
PricesInCentsByBarcode.set('3', 330);
PricesInCentsByBarcode.set('23456', 1250);

class Catalog {

  findPriceThenFotmatPrice(barcode) {
    var price = PricesInCentsByBarcode.get(barcode)
    if (price === null || price === undefined) {
      return price
    } else {
      return this.formatMonetaryAmount(price);
    }
  }

  formatMonetaryAmount(price) {
    var price = parseFloat(price/100).toFixed(2)
    return `$${price.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
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