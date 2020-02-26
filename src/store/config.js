import { createStore, combineReducers  } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import { AsyncStorage } from 'react-native'

import settingsReducer from "./reducers/settingsReducer";
import fridgeReducer from "./reducers/fridgeReducer";
import listReducer from "./reducers/listReducer";
import recipeReducer from "./reducers/recipeReducer";

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

// créé un reducer en utilisant state.key
const reducer = combineReducers({
  "fridgeState" : fridgeReducer,
  "listState" : listReducer,
  "recipeState" : recipeReducer,
  "settingsState" : settingsReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(persistedReducer);
export let persistor = persistStore(store);

export const purgePersistor = () => {
  store.dispatch({type: 'RESET'});
};

// décommenter pour vider le persist
// persistor.purge();
