import * as types from './types';

export function addProduct(product) {
    return {
        type: types.ADD_PRODUCT,
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        barcode: product.barcode,
        image: product.image
    }
}