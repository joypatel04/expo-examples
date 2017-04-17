import Catalog from './../../src/services/catalog';

describe('Format Monetary Amount Tests', () => {
  
    it(`Monetory Amount 889 formates to $8.89`, () => {
      expect(Catalog.format(889)).toEqual('$8.89');
    });

    it(`Monetory Amount 789 formates to $7.89`, () => {
      expect(Catalog.format(789)).toEqual('$7.89');
    });

    it(`Monetory Amount 520 formates to $5.20`, () => {
      expect(Catalog.format(520)).toEqual('$5.20');
    });
  
});