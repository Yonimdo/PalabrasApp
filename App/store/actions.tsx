import * as Google from 'expo-google-app-auth';
import firebase from "firebase";
import { config } from "../config";
import User from './entites/user';
import 'firebase/firestore';
import 'firebase/auth';
import Storage from './storage'
import { AsyncStorage } from 'react-native';


const getAvailableLanguages = async (dispatch: any) => {
    debugger
    let all = await fetch(`${config.storeFirebaseUrl}getAllLanguages`, {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    }).then(data => { return data.json(); }).catch(e => { console.log(e); });
    dispatch(Actions.execute(Actions.GET_AVAILABLE_LANGUAGES, {data:all}))
}
const getUserFields = async (dispatch: any) => {
    debugger;
}

const signinToFirebase = async (dispatch: any) => {
    if (firebase.auth().currentUser) {
        // already authenticated!
        return dispatch(Actions.execute(Actions.LOGIN_FIREBASE));
    }
    const idToken: any = await AsyncStorage.getItem(Storage.LOGIN_ID_TOKEN);
    const googleIdToken: any = await AsyncStorage.getItem(Storage.GOOGLE_ID_TOKEN);
    const accessToken: any = await AsyncStorage.getItem(Storage.LOGIN_ACCESS_TOKEN);
    if (firebase.auth().currentUser) {
        return dispatch(Actions.execute(Actions.LOGIN_FIREBASE))
    };
    let firebaseResult: any = await firebase.auth().signInWithCredential(
        firebase.auth.GoogleAuthProvider.credential(googleIdToken, accessToken))
        .catch(e => {
            AsyncStorage.removeItem(Storage.LOGIN_ID_TOKEN);
            AsyncStorage.removeItem(Storage.GOOGLE_ID_TOKEN);
            AsyncStorage.removeItem(Storage.LOGIN_ACCESS_TOKEN);
            return dispatch(Actions.execute(Actions.LOGIN_FIALED))
        });
    if (!firebaseResult || firebaseResult.type == "LOGIN_FIALED") {
        return dispatch(Actions.execute(Actions.LOGIN_FIALED))
    }
    debugger
    firebaseResult.user.getIdToken().then((token: any) => {
        AsyncStorage.setItem(Storage.LOGIN_ID_TOKEN, `${token}`);
    }).catch((e: any) => console.log(e));
    const fireabseProfile: any = firebaseResult.additionalUserInfo?.profile;
    if (firebaseResult.additionalUserInfo?.isNewUser) {
        // once per user
        dispatch(Actions.execute(Actions.LOGIN_CRAEATE_IN_DB))
        const user = new User();
        user.administrative_fields.isLoggedIn = true;
        user.public_fields.profileImage = fireabseProfile.picture;
        user.public_fields.email = fireabseProfile.locale;
        user.public_fields.name = fireabseProfile.name;
        user.administrative_fields.isNewUser = true;
        user.public_fields.lastLoginDate = Date.now();
        firebase.firestore().collection(`users`)
            .doc(`${firebaseResult.user?.uid}`)
            .set({ ...user }, { merge: true });
    } else {
        firebase.firestore().collection(`users`)
            .doc(`${firebaseResult.user?.uid}`)
            .set({ "lastLoginDate": Date.now() }, { merge: true });
    }
    debugger
    dispatch(Actions.execute(Actions.LOGIN_FIREBASE));
}

const signInWithGoogleAsync = async (dispatch: any) => {
    try {
        const result = await Google.logInAsync({
            behavior: 'web',
            webClientId: config.webClientId,
            iosClientId: config.iosClientId,
            androidClientId: config.androidClientId,
            scopes: ['profile', 'email'],
        });
        if (result.type === 'success') {
            AsyncStorage.setItem(Storage.GOOGLE_ID_TOKEN, `${result.idToken}`);
            AsyncStorage.setItem(Storage.LOGIN_ACCESS_TOKEN, `${result.accessToken}`);
            dispatch(Actions.execute(Actions.GOT_GOOGLE_ID_TOKEN))
        }
        return { cancelled: true };
    } catch (e) {
        console.log(e);
        return { error: true };
    }
}

export class Actions {
    // Auth
    static LOGIN = "LOGIN";
    static LOGIN_FIREBASE = "LOGIN_TO_FIREBASE";
    static LOGIN_CRAEATE_IN_DB = "CREATING_USER_INIT";
    static GOT_GOOGLE_ID_TOKEN = "GOT_GOOGLE_ID_TOKEN";
    static LOGOUT = "LOGOUT";
    static LOGIN_FIALED = "LOGIN_FIALED";
    // Words
    static ADD_UPDATE_WORD = "ADD_UPDATE_WORD";
    static REMOVE_WORD = "REMOVE_WORD";
    // Languages
    static ADD_UPDATE_LANGUAGE = "ADD_UPDATE_LANGUAGE";
    static REMOVE_LANGUAGE = "REMOVE_LANGUAGE";
    static GET_AVAILABLE_LANGUAGES = "GET_AVAILABLE_LANGUAGES";

    static execute = (type: string, payload: any = undefined) => {
        return {
            type,
            payload
        }
    };
    static executeLogin = () => {
        return (dispatch: any) => {
            signInWithGoogleAsync(dispatch);
        };
    };
    static executeFirebaseLogin = () => {
        return (dispatch: any) => {
            signinToFirebase(dispatch);
        };
    };
    static executeGetUserFields = () => {
        return (dispatch: any) => {
            getUserFields(dispatch);
        };
    };
    static executeGetAvailableLanguages = () => {
        return (dispatch: any) => {
            getAvailableLanguages(dispatch);
        };
    };

}