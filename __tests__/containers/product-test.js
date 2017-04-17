import { ActionCreators } from './../../src/actions';
import * as types from './../../src/actions/types';
import reducer from './../../src/reducers/product';
import ProductUtils from './../../src/services/productUtils';

describe('Product Actions', () => {
  it('should add product to products list', () => {
    const product = {
      id: 123,
      name: 'Test',
      description: 'Test using Jest',
      price: '1.22',
      barcode: '123456789',
      image: 'Since its test no URI available'
    }

    const expectedAction = {
      type: types.ADD_PRODUCT,
      id: 123,
      name: 'Test',
      description: 'Test using Jest',
      price: '1.22',
      barcode: '123456789',
      image: 'Since its test no URI available'
    }

    expect(ActionCreators.addProduct(product)).toEqual(expectedAction)
  });
})

describe('Product Reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(
      {
          products: [],
          hasRecords: false   
      }
    )
  });

  it('should handle ADD_PRODUCT', () => {
    expect(
      reducer({products: []}, {
        type: types.ADD_PRODUCT,
        id: 123,
        name: 'Test',
        description: 'Test using Jest',
        price: '1.22',
        barcode: '123456789',
        image: 'Since its test no URI available'
      })
    ).toEqual(
      {
        hasRecords: true,
        products: [
          {
            id: 123,
            name: 'Test',
            description: 'Test using Jest',
            price: '1.22',
            barcode: '123456789',
            image: 'Since its test no URI available'
          }
        ]   
      }
    )
  })
})



describe('Product Actions', () => {

  const products = [
                    {
                      id: 123,
                      name: 'Test 1',
                      description: 'Test using Jest: 1',
                      price: '1.22',
                      barcode: '123456789',
                      image: 'Since its test no URI available'
                    },
                    {
                      id: 456,
                      name: 'Test 2',
                      description: 'Test using Jest: 2',
                      price: '13.02',
                      barcode: '4572334',
                      image: 'Since its test no URI available'
                    },
                    {
                      id: 789,
                      name: 'Test 3',
                      description: 'Test using Jest: 3',
                      price: '11.66',
                      barcode: '35235325',
                      image: 'Since its test no URI available'
                    },
                    {
                      id: 101112,
                      name: 'Test 4',
                      description: 'Test using Jest: 4',
                      price: '0.45',
                      barcode: '90759748',
                      image: 'Since its test no URI available'
                    },
                    {
                      id: 131415,
                      name: 'Test 5',
                      description: 'Test using Jest: 5',
                      price: '17.92',
                      barcode: '47328478',
                      image: 'Since its test no URI available'
                    }
                  ]

  it('should get product details by checking barcode: 47328478', () => {
    expect(ProductUtils.getProductDetails(products, '47328478')).toEqual(
      {
        name: 'Test 5',
        description: 'Test using Jest: 5',
        price: '17.92',
        barcode: '47328478',
        image: 'Since its test no URI available'
      }
    )
  });


  it('should get product details by checking barcode: 35235325', () => {
    expect(ProductUtils.getProductDetails(products, '35235325')).toEqual(
      {
        name: 'Test 3',
        description: 'Test using Jest: 3',
        price: '11.66',
        barcode: '35235325',
        image: 'Since its test no URI available'
      }
    )
  });


  it('should get product details by checking barcode: 123456789', () => {
    expect(ProductUtils.getProductDetails(products, '123456789')).toEqual(
      {
        name: 'Test 1',
        description: 'Test using Jest: 1',
        price: '1.22',
        barcode: '123456789',
        image: 'Since its test no URI available'
      }
    )
  });
})