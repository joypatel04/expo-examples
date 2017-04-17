import Sale from './../../src/services/sale';

describe('ComputePurchaseTotal Tests', () => {

  it('Zero Items', () => {
      expect(Sale.computePurchaseTotal([])).toEqual(0);
  });

  it('One Item', () => {
      expect(Sale.computePurchaseTotal([795])).toEqual(795);
  });

  it('Sevral Items', () => {
      expect(Sale.computePurchaseTotal([850, 1275, 325])).toEqual(2450);
  });

});