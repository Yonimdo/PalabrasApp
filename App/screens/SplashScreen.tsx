import React, { useEffect } from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import User from '../store/entites/user';
import { Actions } from '../store/actions';
import Storage from '../store/storage'

export default function SplashScreen(props: any) {

  const profile: User = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();
  if (!profile.administrative_fields.isLoggedIn) {
    AsyncStorage.getItem(Storage.GOOGLE_ID_TOKEN).then(token => {
      if (token) {
        return dispatch(Actions.executeFirebaseLogin())
      } else {
        return props.navigation.navigate('LoginScreen')
      }
    });
  } else {
    if (profile.languages.length == 0) {
      return props.navigation.navigate('SelectLanguages');
    }
    if (!profile.public_fields.name) {
      return dispatch(Actions.executeGetUserFields())
      // return props.navigation.navigate('SelectLangugaes');
    }
  }



  // if(profile.isLoggedIn){
  //   props.navigation.navigate('MainScreen');
  // }else{
  //   props.navigation.navigate('LoginScreen')
  // }

  return (
    <View style={styles.container}>
      <Text>Splash!</Text>
      <Text>{profile.display}</Text>
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
