import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PParallaxSwiper from './components/pParallaxSwiper';
import {createStore} from 'redux'
import reducers from './store/reducers'
import {Provider} from 'react-redux'
  const store = createStore(
    reducers, /* preloadedState, */
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
export default function App() {
  return (
    <Provider store={store}>
      <PParallaxSwiper >
      {/* <Text>Open up App.tsx to start working on your app!</Text> */}
      </PParallaxSwiper>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
