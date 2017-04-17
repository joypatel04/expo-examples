import Sale from './../../src/services/sale';

describe('PointOfSale SaleOneItem Tests', () => {
    var sale = Sale.prototype;

    it('Product Found', () => {
        expect(sale.saleItem('12345')).toEqual('$7.95');
    });

    it('Another Product Found', () => {
        expect(sale.saleItem('23456')).toEqual('$12.50');
    });

    it('Product Not Found', () => {
        expect(sale.saleItem('99999')).toEqual('Product not found for 99999');
    });

    it('Scanning Error', () => {
        expect(sale.saleItem('')).toEqual('Scanning Error: Empty Barcode');
    });
});

