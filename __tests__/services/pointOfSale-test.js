import PointOfSale from './../../src/services/pointOfSale';

describe('PointOfSale Tests', () => {
    it('Product Found', () => {
        expect(PointOfSale.prototype.Sale('12345')).toEqual('$7.95');
    });

    it('Another Product Found', () => {
        expect(PointOfSale.prototype.Sale('23456')).toEqual('$12.50');
    });

    it('Product Not Found', () => {
        expect(PointOfSale.prototype.Sale('99999')).toEqual('Product not found for 99999');
    });

    it('Scanning Error', () => {
        expect(PointOfSale.prototype.Sale('')).toEqual('Scanning Error: Empty Barcode');
    });
});