
const INITIAL_STATE = {
  data: [
      {  title: 'Allie',
          description: ''
      },
      {  title: 'Gator',
          description: ''
      },
      {  title: 'Lizzie',
          description: ''
      },
      {  title: 'Reptar',
          description: ''
      }
    ],
};

const wordsReducer = (state = INITIAL_STATE, action:any) => {
  switch (action.type) {
    default:
      return state
  }
};

export default wordsReducer;
