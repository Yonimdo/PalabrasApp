import * as Google from 'expo-google-app-auth';
import firebase from "firebase";
import { config } from "../config";
import User from './entites/user';
import 'firebase/firestore';
import 'firebase/auth';
import Storage from './storage'
import { AsyncStorage } from 'react-native';


const getAvailableLanguages = async (dispatch: any) => {
    let all = await fetch(`${config.storeFirebaseUrl}getAllLanguages`, {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    }).then(data => { return data.json(); }).catch(e => { console.log(e); });
    dispatch(Actions.execute(Actions.GET_AVAILABLE_LANGUAGES, {data:all}))
}
const getUserFields = async (dispatch: any, current:User=new User()) => {
    if(!current.public_fields.name){
        const user = await firebase.firestore().collection("users").doc(current.administrative_fields.uid).get()
            .then(u => u.data()).catch(e=>{debugger});
        return dispatch(Actions.execute(Actions.GET_USER_FIELDS, user))
    }
    dispatch(Actions.execute(Actions.GET_USER_FIELDS, current));
}

const signinToFirebase = async (dispatch: any) => {
    if (!firebase.apps.length) {
        firebase.initializeApp(config.firebaseConfig);
    }
    const user = new User();
    
    user.administrative_fields.uid = firebase.auth().currentUser?.uid || ''
    if (user.administrative_fields.uid != '') {
        // already authenticated!
        user.administrative_fields.isLoggedIn = true;
        return dispatch(Actions.execute(Actions.LOGIN_FIREBASE, user));
    }
    const idToken: any = await AsyncStorage.getItem(Storage.LOGIN_ID_TOKEN);
    const googleIdToken: any = await AsyncStorage.getItem(Storage.GOOGLE_ID_TOKEN);
    const accessToken: any = await AsyncStorage.getItem(Storage.LOGIN_ACCESS_TOKEN);
    user.administrative_fields.uid = firebase.auth().currentUser?.uid || ''
    if (user.administrative_fields.uid != '') {
        user.administrative_fields.isLoggedIn = true;
        return dispatch(Actions.execute(Actions.LOGIN_FIREBASE, user))
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

    firebaseResult.user.getIdToken().then((token: any) => {
        AsyncStorage.setItem(Storage.LOGIN_ID_TOKEN, `${token}`);
    }).catch((e: any) => console.log(e));
    const fireabseProfile: any = firebaseResult.additionalUserInfo?.profile;
    if (firebaseResult.additionalUserInfo?.isNewUser) {
        // once per user
        dispatch(Actions.execute(Actions.LOGIN_CRAEATE_IN_DB))
        user.administrative_fields.isLoggedIn = true;
        user.public_fields.profileImage = fireabseProfile.picture;
        user.public_fields.email = fireabseProfile.email;
        user.public_fields.name = fireabseProfile.name;
        user.administrative_fields.isNewUser = true;
        user.administrative_fields.uid = `${firebase.auth().currentUser?.uid}`;
        user.settings.locale = fireabseProfile.locale;

        user.public_fields.lastLoginDate = Date.now();
        firebase.firestore().collection(`users`)
            .doc(`${firebaseResult.user?.uid}`)
            .set({ ...user }, { merge: true });
    } else {
        firebase.firestore().collection(`users`)
            .doc(`${firebaseResult.user?.uid}`)
            .set({ "lastLoginDate": Date.now() }, { merge: true });
    }
    user.administrative_fields.isLoggedIn = true;
    user.administrative_fields.uid = firebase.auth().currentUser?.uid || ''
    dispatch(Actions.execute(Actions.LOGIN_FIREBASE, user));
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
    static GET_USER_FIELDS = "GET_USER_FIELDS";
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
    static executeGetUserFields = (current:User=new User()) => {
        return (dispatch: any) => {
            getUserFields(dispatch, current);
        };
    };
    static executeGetAvailableLanguages = () => {
        return (dispatch: any) => {
            getAvailableLanguages(dispatch);
        };
    };

}