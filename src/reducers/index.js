import { combineReducers } from "redux";
import newbusReducer from "./newbusSlice";
// import todoEditReducer from "./todoEditSlice";
// import listMenuReducer from "./listMenuSlice";

export default combineReducers({
    newbus: newbusReducer,

});