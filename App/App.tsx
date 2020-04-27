import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { createStore, applyMiddleware } from 'redux'
import reducers from './store/reducers'
import { Provider } from 'react-redux'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import LoginScreen from "./screens/LoginScreen"
import MainScreen from "./screens/MainScreen"
import thunk from 'redux-thunk'
import SplashScreen from "./screens/SplashScreen"
const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);
const { width, height } = Dimensions.get("window");

const AppSwitchNavigator = createSwitchNavigator({
  SplashScreen,
  LoginScreen,
  MainScreen,
});
const AppNavigator = createAppContainer(AppSwitchNavigator)

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator style={styles.container}></AppNavigator>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:width,
    height:height,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
