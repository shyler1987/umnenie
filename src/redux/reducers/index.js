import {combineReducers} from  'redux';
import mainReducer from './mainReducer';
console.log("3. betda");
const rootReducer = combineReducers({
    mainData:mainReducer,
})

export default rootReducer;