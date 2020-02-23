import { createStore, combineReducers  } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import { AsyncStorage } from 'react-native'

import settingsReducer from "./reducers/settingsReducer";
import fridgeReducer from "./reducers/fridgeReducer";
import listReducer from "./reducers/listReducer";

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

// TODO UNCOMMENT AND SEARCH HOW TO MERGE MULTIPLE REDUCERS

// créé un reducer en utilisant state.key
const reducer = combineReducers({
  "settingsState" : settingsReducer,
  "fridgeState" : fridgeReducer,
  "listState" : listReducer
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(persistedReducer);
export let persistor = persistStore(store);

// décommenter pour vider le persist
// persistor.purge();
