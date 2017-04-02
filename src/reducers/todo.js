import * as types from './../actions/types'

const initialState = {
    VisibilityFilters: types.VisibilityFilters.SHOW_ALL,
    todos: []
}

export default function toDos(state = initialState, action) {
    switch(action.type) {
        case types.ADD_TODO:
            return Object.assign({}, state, {
                todos: [
                    ...state.todos,
                    {
                        text: action.text,
                        completed: false,
                        id: Math.random()
                    }
                ]
            });
        case types.TOGGLE_TODO:
            return Object.assign({}, state, {
                todos: state.todos.map((todo) => {
                    if (todo.id === action.id) {
                        return Object.assign({}, todo, {
                            completed: !todo.completed
                        })
                    }
                    return todo;
                })
            });               
        default:
            return state;
    }
}