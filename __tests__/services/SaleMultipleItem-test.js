import Sale from './../../src/services/sale';

describe('PointOfSale SaleMultipleItem Tests', () => {
    
    it('Zero Items', () => {
        expect(Sale.onTotal()).toEqual('No sale in progress. Try scanning a product');
    });

    it('One Item Found', () => {
        Sale.onBarcode('12345');
        expect(Sale.onTotal()).toEqual('Total: $6.50');
    });
});