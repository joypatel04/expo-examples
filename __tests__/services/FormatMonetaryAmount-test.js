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

    it(`Monetory Amount 400 formates to $4.00`, () => {
      expect(Catalog.format(400)).toEqual('$4.00');
    });

    it(`Monetory Amount 0 formates to $0.00`, () => {
      expect(Catalog.format(0)).toEqual('$0.00');
    });

    it(`Monetory Amount 2 formates to $0.02`, () => {
      expect(Catalog.format(2)).toEqual('$0.02');
    });
  
    it(`Monetory Amount 37 formates to $0.37`, () => {
      expect(Catalog.format(37)).toEqual('$0.37');
    });

    it(`Monetory Amount 418976 formates to $4,189.76`, () => {
      expect(Catalog.format(418976)).toEqual('$4,189.76');
    });

    it(`Monetory Amount 210832281 formates to $2,108,322.81`, () => {
      expect(Catalog.format(210832281)).toEqual('$2,108,322.81');
    });
});