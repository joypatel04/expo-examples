import PointOfSale from './../../src/services/pointOfSale';

describe('PointOfSale Tests', () => {
    it('Sale One Item', () => {

        
        expect(PointOfSale.Sale("12345")).toEqual("$7.95")
        expect(PointOfSale.Display()).toEqual('$7.95')
    });

    it('Another Product Found', () => {
        expect(PointOfSale.Sale("23456")).toEqual("$12.50")
        expect(PointOfSale.Display()).toEqual("$12.50")
    });
});