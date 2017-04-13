import PointOfSale from './../../src/services/pointOfSale';

describe('PointOfSale Tests', () => {
    it('Product Found', () => {
        PointOfSale.Sale('12345')
        expect(PointOfSale.Display()).toEqual('$7.95');
    });

    it('Another Product Found', () => {
        PointOfSale.Sale('23456')
        expect(PointOfSale.Display()).toEqual('$12.50');
    });

    it('Product Not Found', () => {
        PointOfSale.Sale('99999')
        expect(PointOfSale.Display()).toEqual('Product not found for 99999');
    });

    it('Product Not Found', () => {
        PointOfSale.Sale('')
        expect(PointOfSale.Display()).toEqual('Scanning Error: Empty Barcode');
    });
});