import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {View, StyleSheet} from 'react-native';

import Navigation from './src/navigation/Navigation';
import {store, persistor} from './src/store/config';

export default function App() {
  return (
      <Provider store={ store }>
        <PersistGate loading={null} persistor={persistor}>
          <View style={styles.container}>
            <Navigation/>
          </View>
        </PersistGate>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
