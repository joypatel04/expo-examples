import Sale from './../../src/services/sale';

describe('ScanOneItem Tests', () => {
	it('Product Found', () => {
		expect(Sale.onBarcode('12345')).toEqual('$7.95');
	});

	it('Another Product Found', () => {
		expect(Sale.onBarcode('23456')).toEqual('$12.50');
	});

	it('Product Not Found', () => {
		expect(Sale.onBarcode('99999')).toEqual('Product not found for 99999');
	});

	it('Scanning Error', () => {
		expect(Sale.onBarcode('')).toEqual('Scanning Error: Empty Barcode');
	});
});

