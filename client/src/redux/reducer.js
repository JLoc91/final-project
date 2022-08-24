import { combineReducers } from "redux";
import footballDataReducer from "./Football/slice";
import weatherDataReducer from "./Weather/slice";

const rootReducer = combineReducers({
    footballList: footballDataReducer,
    weatherList: weatherDataReducer,
});

export default rootReducer;
