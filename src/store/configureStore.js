import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createNavigationEnabledStore, NavigationReducer } from '@expo/ex-navigation';
import thunk from 'redux-thunk';
import counter from './../reducers/counter';
import toDos from './../reducers/todo';


function configureStore(initialState) {

    const createStoreWithNavigation = createNavigationEnabledStore({
        createStore,
        navigationStateKey: 'navigation',
    });

    const rootReducer = combineReducers({
        counter,
        toDos,
        navigation: NavigationReducer,
    });

    const store = createStoreWithNavigation(
        rootReducer,
        applyMiddleware(thunk)
    )

    if (module.hot) {
        module.hot.accept(() => {
            const nextRootReducer = rootReducer;
            store.replaceReducer(nextRootReducer);
        })
    }

    return store;
}

const Store = configureStore({});

export default Store;
