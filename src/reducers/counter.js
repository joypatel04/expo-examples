import * as types from './../actions/types'

const initialState = {
    number: 0,
}

export default function counter(state = initialState, action) {
    switch (action.type) {
        case types.ADD_NUMBER:
            return {
                number: action.number
            };
        case types.REMOVE_NUMBER:
            return {
                number: action.number
            }
        case types.RESET_NUMBER:
            return {
                number: action.number
            }    
        default:
            return state;        
    }
}