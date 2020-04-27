import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PParallaxSwiper from '../components/pParallaxSwiper';


export default function MainScreen() {
  return (
      <PParallaxSwiper >
        {/* <Text>Open up App.tsx to start working on your app!</Text> */}
      </PParallaxSwiper>
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
