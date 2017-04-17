import Sale from './../../src/services/sale';

describe('PointOfSale SaleOneItem Tests', () => {
    it('Product Found', () => {
        expect(Sale.saleItem('12345')).toEqual('$7.95');
    });

    it('Another Product Found', () => {
        expect(Sale.saleItem('23456')).toEqual('$12.50');
    });

    it('Product Not Found', () => {
        expect(Sale.saleItem('99999')).toEqual('Product not found for 99999');
    });

    it('Scanning Error', () => {
        expect(Sale.saleItem('')).toEqual('Scanning Error: Empty Barcode');
    });
});

