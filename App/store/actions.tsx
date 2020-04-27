import * as Google from 'expo-google-app-auth';
import firebase from "firebase";
import { config } from "../config";
import User from './entites/user';
import 'firebase/firestore';
import 'firebase/auth';


const signInWithGoogleAsyncToFirebase = async (dispatch:any) => {
    try {
        const result = await Google.logInAsync({
            behavior: 'web',
            webClientId: config.webClientId,
            iosClientId: config.iosClientId,
            androidClientId: config.androidClientId,
            scopes: ['profile', 'email'],
        });
        if (result.type === 'success') {
            // const user = (!!firebase) && ;
            Actions.execute(Actions.LOGIN_FIREBASE)
            const firebaseResult = await firebase.auth().signInWithCredential(
                firebase.auth.GoogleAuthProvider.credential(
                result.idToken, result.accessToken));
            const fireabseProfile:any = firebaseResult.additionalUserInfo?.profile;
            if(firebaseResult.additionalUserInfo?.isNewUser){
                // once per user
                Actions.execute(Actions.LOGIN_CRAEATE_IN_DB)
                const user = new User();
                user.isLoggedIn = true;
                user.profileImage = fireabseProfile.picture;
                user.email = fireabseProfile.locale;
                user.name = fireabseProfile.name;
                user.isNewUser = true;
                user.lastLoginDate = Date.now();
                firebase.firestore().collection(`users`)
                    .doc(`${firebaseResult.user?.uid}`)
                    .set({...user},{merge:true});    
            }else{
                firebase.firestore().collection(`users`)
                .doc(`${firebaseResult.user?.uid}`)
                .set({"lastLoginDate":Date.now()},{merge:true});
            }
            Actions.execute(Actions.LOGIN);
        }
        return { cancelled: true };
    } catch (e) {
        console.log(e);
        return { error: true };
    }
}

export class Actions {
    static LOGIN = "LOGIN";
    static LOGIN_FIREBASE = "LOGIN_TO_FIREBASE";
    static LOGIN_CRAEATE_IN_DB = "CREATING_USER_INIT";
    static LOGOUT = "LOGOUT";
    static ADD_UPDATE_WORD = "ADD_UPDATE_WORD";
    static REMOVE_WORD = "REMOVE_LANGUAGE";
    static ADD_LANGUAGE = "REMOVE_LANGUAGE";
    static REMOVE_LANGUAGE = "REMOVE_LANGUAGE";
    static execute = (type: string, payload: any = undefined) => {
        return {
            type,
            payload
        }
    };
    static executeLogin = () => {
        return (dispatch: any) => {
            signInWithGoogleAsyncToFirebase(dispatch);
        };
    };
}