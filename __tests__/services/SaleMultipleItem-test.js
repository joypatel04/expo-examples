import Display from './../../src/services/display';

describe('PointOfSale SaleMultipleItem Tests', () => {
    var display = Display.prototype;

    it('Zero Items', () => {
        expect(display.getText()).toEqual('No sale in progress. Try scanning a product');
    });
});