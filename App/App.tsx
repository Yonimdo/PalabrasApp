import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { createStore, applyMiddleware } from 'redux'
import reducers from './store/reducers'
import { Provider } from 'react-redux'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import LoginScreen from "./screens/LoginScreen"
import MainScreen from "./screens/MainScreen"
import thunk from 'redux-thunk'
import SplashScreen from "./screens/SplashScreen"
import ProfileScreen from "./screens/ProfileScreen"
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);
const { width, height } = Dimensions.get("window");

const AppSwitchNavigator = createSwitchNavigator({
  SplashScreen,
  LoginScreen,
  MainScreen,
  ProfileScreen,
});
const AppNavigator = createAppContainer(AppSwitchNavigator)

export default function App() {
  return (
    <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      <Provider store={store}>
        <AppNavigator style={styles.container}></AppNavigator>
      </Provider>
    </ApplicationProvider>
    </>
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
