import * as types from './types';

export function addToDo(text, id) {
    return {
        type: types.ADD_TODO,
        text: text,
        id: id
    }
}

export function toggleToDo(id) {
    return {
        type: types.TOGGLE_TODO,
        id: id
    }
}