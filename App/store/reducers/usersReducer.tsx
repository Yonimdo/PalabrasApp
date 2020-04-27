import { Actions }  from '../actions';
import firebase from "firebase";
import User from "../entites/user";


const INITIAL_STATE = {
  data: []
};

const profileReducer = (state: User = new User(), action: any) => {
  const user = firebase.auth().currentUser;
  if(!!user){
    
  }
  switch (action.type) {
    case Actions.LOGIN_CRAEATE_IN_DB:
      state.name = `Hello there ${user?.displayName}, were creating your data, please wait`
      return state
    case Actions.LOGIN_FIREBASE:
      state.name = "Analyzing data please hold"
      return state
      case Actions.LOGIN:
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
