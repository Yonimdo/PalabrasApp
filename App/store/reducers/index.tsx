import { combineReducers } from 'redux';
import languagesReducer  from './languagesReducer'
import usersReducer  from './usersReducer'
import settingsReducer  from './settingsReducer'
import wordsReducer  from './wordsReducer'

const reducers = combineReducers({
    words:wordsReducer,
    languages:languagesReducer,
    users:usersReducer,
    profile:usersReducer.profileReducer,
    settings:settingsReducer,
});

export default reducers