import { combineReducers } from "redux";
import footballDataReducer from "./Football/slice";

const rootReducer = combineReducers({
    footballList: footballDataReducer,
    
});

export default rootReducer;