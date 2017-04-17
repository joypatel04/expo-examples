import Display from './../../src/services/display';

describe('PointOfSale SaleMultipleItem Tests', () => {
    it('Zero Items', () => {
        expect(Display.getText()).toEqual('No sale in progress. Try scanning a product');
    });
});