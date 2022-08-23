import { combineReducers } from "redux";
import footballDataReducer from "./Football/slice";

const rootReducer = combineReducers({
    friendsList: footballDataReducer,
    
});

export default rootReducer;