import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createNavigationEnabledStore, NavigationReducer } from '@expo/ex-navigation';
import thunk from 'redux-thunk';
import reducer from './../reducers';
import counter from './../reducers/counter';


function configureStore(initialState) {

    const createStoreWithNavigation = createNavigationEnabledStore({
        createStore,
        navigationStateKey: 'navigation',
    });

    const store = createStoreWithNavigation(
        combineReducers({
            counter,
            navigation: NavigationReducer,
        }),
        applyMiddleware(thunk)
    )

    if (module.hot) {
        module.hot.accept(() => {
            const nextRootReducer = require('../reducers/index').default;
            store.replaceReducer(nextRootReducer);
        })
    }

    return store;
}

const Store = configureStore({});

export default Store;
