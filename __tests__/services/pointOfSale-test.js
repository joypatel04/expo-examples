import PointOfSale from './../../src/services/pointOfSale';

describe('PointOfSale Tests', () => {
    it('Sale One Item', () => {
        expect(PointOfSale.onBarcode("12345")).toEqual("$7.95")
        expect(PointOfSale.display()).toEqual("$7.95")
    });
});