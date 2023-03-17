import { combineReducers } from "redux";
import newbusReducer from "./newbusSlice";
import minibusReducer from "./minibusSlice";
import kmbReducer from "./kmbSlice";

export default combineReducers({
    newbus: newbusReducer,
    minibus: minibusReducer,
    kmb: kmbReducer,
});