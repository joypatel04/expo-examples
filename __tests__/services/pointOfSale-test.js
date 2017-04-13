import PointOfSale from './../../src/services/pointOfSale';

describe('PointOfSale Tests', () => {

    var PricesByBarcode = new Map();
    PricesByBarcode.set('12345', '$7.95');
    PricesByBarcode.set('23456', '$12.50');

    it('Product Found', () => {
        PointOfSale.Sale('12345', PricesByBarcode)
        expect(PointOfSale.Display()).toEqual('$7.95');
    });

    it('Another Product Found', () => {
        PointOfSale.Sale('23456', PricesByBarcode)
        expect(PointOfSale.Display()).toEqual('$12.50');
    });

    it('Product Not Found', () => {
        PointOfSale.Sale('99999', PricesByBarcode)
        expect(PointOfSale.Display()).toEqual('Product not found for 99999');
    });

    it('Product Not Found', () => {
        PointOfSale.Sale('', PricesByBarcode)
        expect(PointOfSale.Display()).toEqual('Scanning Error: Empty Barcode');
    });
});