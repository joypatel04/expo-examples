import * as types from './types';

export function addNumber(number) {
    return {
        type: types.ADD_NUMBER,
        number: number
    }
}

export function removeNumber(number) {
    return {
        type: types.REMOVE_NUMBER,
        number: number
    }
}

export function resetNumber() {
    return {
        type: types.RESET_NUMBER,
        number: 0
    }
}