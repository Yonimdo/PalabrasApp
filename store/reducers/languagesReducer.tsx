
const INITIAL_STATE = {
  data:[{
      cheatsheet: '',
      title:'english',    
    }
  ]
};

const languagesReducer = (state = INITIAL_STATE, action:any) => {
  switch (action.type) {
    default:
      return state
  }
};

export default languagesReducer;
