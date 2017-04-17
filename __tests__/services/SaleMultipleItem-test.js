import Sale from './../../src/services/sale';

describe('SaleMultipleItem Tests', () => {
    
    it('Zero Items', () => {
        expect(Sale.onTotal()).toEqual('No sale in progress. Try scanning a product');
    });

    it('One Item Found', () => {
        Sale.onBarcode('12345');
        expect(Sale.onTotal()).toEqual('Total: $7.95');
    });

    // it('One Item Not Found', () => {
    //     Sale.onBarcode('12345');
    //     Sale.onBarcode('99999');
    //     expect(Sale.onTotal()).toEqual('No sale in progress. Try scanning a product');
    // })

    it('One Item Not Found', () => {
        Sale.onBarcode('12345');
        Sale.onBarcode('99999');
        expect(Sale.onTotal()).toEqual('Total: $7.95');
    })

    // it('Several Items All Found', () => {
    //     Sale.onBarcode('1');
    //     Sale.onBarcode('2');
    //     Sale.onBarcode('3')
    //     expect(Sale.onTotal()).toEqual('Total: $24.55');
    // })
});