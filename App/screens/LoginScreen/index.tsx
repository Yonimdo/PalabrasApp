import React from 'react';
import { View, Button } from 'react-native';
import { useDispatch , useSelector} from 'react-redux';
import {Actions} from '~/store/actions'
import User from '~/store/entites/user';
import styles from './style'
// import * as firebase from 'firebase';
// import Expo from 'expo'
export default function LoginScreen(props:any) {

  const profile:User = useSelector((state:any) => state.profile)
  const dispatch = useDispatch();
  
  if(profile.administrative_fields.token){
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
