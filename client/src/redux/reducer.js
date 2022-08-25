import { combineReducers } from "redux";
import footballDataReducer from "./Football/slice";
import weatherDataReducer from "./Weather/slice";
import travelDataReducer from "./Travel/slice";

const rootReducer = combineReducers({
    footballList: footballDataReducer,
    weatherList: weatherDataReducer,
    travelList: travelDataReducer,
});

export default rootReducer;
