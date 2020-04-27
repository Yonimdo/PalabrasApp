import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import User from '../store/entites/user';


export default function SplashScreen(props:any) {

  const profile:User = useSelector((state:any) => state.profile)
  debugger;
  

  if(profile.isLoggedIn){
    props.navigation.navigate('MainScreen');
  }else{
    props.navigation.navigate('LoginScreen')
  }

  return (
    <View style={styles.container}>
        <Text>Splash!</Text>
    </View>
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
