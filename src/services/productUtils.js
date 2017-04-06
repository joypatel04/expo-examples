'use strict';

const ProductUtils = {
    
    getProductDetails(products, barcode) {
        if (products.length !== 0) {
            var filterProduct = products.filter((value) => {return value.barcode === barcode});
            let product = {
                name: filterProduct[0].name,
                description: filterProduct[0].description,
                price: filterProduct[0].price,
                image: filterProduct[0].image,
                barcode: filterProduct[0].barcode
            }
            return product;
        } 
        return null;
    }

}

module.exports = ProductUtils;