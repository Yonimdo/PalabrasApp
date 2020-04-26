
const PROFILE_INITIAL_STATE = {
  name:"",
  profileImage:"",
  about:"",
  isLoggedIn:false,
  isPremium:false
};

const INITIAL_STATE = {
  data:[
    PROFILE_INITIAL_STATE
  ]
};

const profileReducer = (state = PROFILE_INITIAL_STATE, action:any) => {
  switch (action.type) {
    default:
      return state
  }
};

const usersReducer = (state = INITIAL_STATE, action:any) => {
  switch (action.type) {
    default:
      return state
  }
};

usersReducer.profileReducer = profileReducer;

export default usersReducer;
