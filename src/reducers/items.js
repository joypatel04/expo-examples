import types from './../actions/types'

const initialState = {
    onlineList: [],
    offlineList: [],
    connectionChecked: false
}

export default function itmes(state = initialState, action) {
    switch (action.type) {
        default:
            return state;    
    }
}