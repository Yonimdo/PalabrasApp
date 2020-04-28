import { config } from "../../config"
import { Actions } from "../actions";

const languagesReducer = (state:any = {data:[]}, action:any) => {
  switch (action.type) {
    case Actions.GET_AVAILABLE_LANGUAGES:
      return {...action.payload}
    default:
      return state
  }
};

export default languagesReducer;
