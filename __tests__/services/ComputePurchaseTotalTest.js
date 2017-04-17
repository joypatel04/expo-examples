import Sale from './../../src/services/sale';

describe('ComputePurchaseTotal Tests', () => {

  it('Zero Items [] to Equal 0', () => {
      expect(Sale.computePurchaseTotal([])).toEqual(0);
  });

  it('One Item [795] to Equal 795', () => {
      expect(Sale.computePurchaseTotal([795])).toEqual(795);
  });

  it('Sevral Items [850, 1275, 325] to Equal 2450', () => {
      expect(Sale.computePurchaseTotal([850, 1275, 325])).toEqual(2450);
  });

});