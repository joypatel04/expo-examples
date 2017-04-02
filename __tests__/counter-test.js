import { ActionCreators } from './../src/actions';
import * as types from './../src/actions/types';
import reducer from './../src/reducers/counter';

describe('Counter Actions', () => {
    it('should add 1 to state of number', () => {
        const initialNumber = 0

        const expectedAction = {
            type: types.ADD_NUMBER,
            number: 1
        }

        expect(ActionCreators.addNumber(initialNumber + 1)).toEqual(expectedAction)
    })

    it('should minus 1 to state of number', () => {
        const initialNumber = 5

        const expectedAction = {
            type: types.REMOVE_NUMBER,
            number: 4
        }

        expect(ActionCreators.removeNumber(initialNumber - 1)).toEqual(expectedAction)
    })

    it('should reset counter to 0', () => {
        const expectedAction = {
            type: types.RESET_NUMBER,
            number: 0
        }

        expect(ActionCreators.resetNumber()).toEqual(expectedAction)
    })
});

describe('Couter Reducers', () => {
    it('should return the initial state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual(
            {
                number: 0
            }
        )
    })

    it('should handle ADD_NUMBER', () => {
        expect(
            reducer([], {
                type: types.ADD_NUMBER,
                number: 3
            })
        ).toEqual(
            {
                number: 3
            }
        )
    })

    it('should handle REMOVE_NUMBER', () => {
        expect(
            reducer([], {
                type: types.REMOVE_NUMBER,
                number: 2
            })
        ).toEqual(
            {
                number: 2
            }
        )
    })

    it('should handle RESET_NUMBER', () => {
        expect(
            reducer([], {
                type: types.RESET_NUMBER,
                number: 0
            })
        ).toEqual(
            {
                number: 0
            }
        )
    })
})

