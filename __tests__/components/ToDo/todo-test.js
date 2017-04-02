import { ActionCreators } from './../../../src/actions';
import * as types from './../../../src/actions/types';
import reducer from './../../../src/reducers/todo';

describe('To-Do Actions', () => {
    it('should add new to-do to list', () => {
        const text = 'Laundry'
        const id = 523
        const expectedAction = {
            type: types.ADD_TODO,
            text: text,
            id: id
        }

        expect(ActionCreators.addToDo(text, id)).toEqual(expectedAction)
    })

    it('should toggle to-do', () => {
        const id = 1

        const expectedAction = {
            type: types.TOGGLE_TODO,
            id: 1
        }

        expect(ActionCreators.toggleToDo(id)).toEqual(expectedAction)
    })
});

describe('To-Do Reducer', () => {
    it('should return the initial state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual(
            {
                todos: []
            }
        )
    })

    it('should handle ADD_TODO', () => {
        expect(
            reducer({todos: []}, {
                type: types.ADD_TODO,
                text: 'Laundry',
                id: 23
            })
        ).toEqual(
            {
                todos: [
                    {
                        text: 'Laundry',
                        completed: false,
                        id: 23
                    }
                ]
            }
        )
    })

    it('should handle TOGGLE_TODO', () => {
        expect(
            reducer({todos: [
                {
                    text: 'Laundry',
                    completed: false,
                    id: 23
                },
                {
                    text: 'Buy Camera',
                    completed: false,
                    id: 12
                }
            ]}, 
            {
                type: types.TOGGLE_TODO,
                id: 12
            })
        ).toEqual(
            {
                todos: [
                    {
                        text: 'Laundry',
                        completed: false,
                        id: 23
                    },
                    {
                        text: 'Buy Camera',
                        completed: true,
                        id: 12
                    }
                ]
            }
        )
    })
})