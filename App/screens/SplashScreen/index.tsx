import React, { useEffect } from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import User from '~/store/entites/user';
import { Actions } from '~/store/actions';
import Storage from '~/store/storage'

export default function SplashScreen(props: any) {

  const profile: User = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();
  if (!profile.administrative_fields.isLoggedIn) {
    AsyncStorage.getItem(Storage.GOOGLE_ID_TOKEN).then(token => {
      if (token) {
        // Stay in page
        dispatch(Actions.executeFirebaseLogin())
      } else {
        return props.navigation.navigate('LoginScreen')
      }
    });
  } else if (!profile.public_fields.name) {
    // Stay in page
    dispatch(Actions.executeGetUserFields(profile))
  } else if (profile.languages.length == 0) {
    return props.navigation.navigate('ProfileScreen');
  } else {
    // User Is in firebase, we have all the data to continue. 
    return props.navigation.navigate('MainScreen');
  }


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
