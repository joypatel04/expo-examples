import * as types from './../actions/types'

const initialState = {
    products: [],
    hasRecords: false
}

export default function product(state = initialState, action) {
    switch(action.type) {
        case types.ADD_PRODUCT:
            return Object.assign({}, state, {
                hasRecords: true,
                products: [
                    ...state.products,
                    {
                        id: action.id,
                        name: action.name,
                        description: action.description,
                        price: action.price,
                        barcode: action.barcode,
                        image: action.image
                    }
                ]
            })
        default:
            return state;    
    }
}