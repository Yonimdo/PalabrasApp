import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import PParallaxSwiper from '../components/pParallaxSwiper';
import { useDispatch , useSelector} from 'react-redux';
import {Actions} from '../store/actions'
// import * as firebase from 'firebase';
// import Expo from 'expo'
export default function LoginScreen(props:any) {

  const profile = useSelector((state:any) => state.profile)
  const dispatch = useDispatch();
  debugger;
  if(profile.isLoggedIn){
    props.navigation.navigate('SplashScreen');
  }

  return (
    <View style={styles.container}>
        <Button 
          title="Sign in With Google"
          onPress={()=>{dispatch(Actions.executeLogin())}}></Button>
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
