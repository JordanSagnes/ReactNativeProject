import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import { AsyncStorage } from 'react-native'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

// TODO UNCOMMENT AND SEARCH HOW TO MERGE MULTIPLE REDUCERS

// const persistedReducer = persistReducer(persistConfig, restaurantReducer);
// export const store = createStore(persistedReducer);
// export let persistor = persistStore(store);