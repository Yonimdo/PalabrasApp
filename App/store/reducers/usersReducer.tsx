import { Actions } from '../actions';
import firebase from "firebase";
import User from "../entites/user";


const INITIAL_STATE = {
  data: []
};

const profileReducer = (state: User = new User(), action: any) => {
  const user = firebase.auth().currentUser;
  if (!!user) {
      state.administrative_fields.uid = user.uid;
      state.administrative_fields.isLoggedIn = true;
  }
  switch (action.type) {
    case Actions.LOGIN_CRAEATE_IN_DB:
      state.display = `Hello there ${user?.displayName}, were creating your data, please wait`
      return { ...state }
    case Actions.LOGIN_FIALED:
      state.display = "Login failed"
      state.administrative_fields.token = false;
      return { ...state }
    case Actions.GOT_GOOGLE_ID_TOKEN:
      state.display = "Analyzing data please hold"
      state.administrative_fields.token = true;
      return { ...state }
    case Actions.LOGIN_FIREBASE:
      state.display = "Analyzing data please hold"
      return { ...action.payload }
    case Actions.GET_USER_FIELDS:
      state.display = (action.payload.public_fields.name) ? "": "Failed getting user data"
      return { ...action.payload }
    case Actions.LOGIN:
      return { ...state }
    default:
      return state
  }
};

const usersReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    default:
      return state
  }
};

usersReducer.profileReducer = profileReducer;

export default usersReducer;
