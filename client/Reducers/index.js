import {combineReducers} from "redux"
import todoReducer from "./todoReducer"
import inputReducer from "./inputReducer"

export const reducer = combineReducers({
    inputs:inputReducer,
    todos:todoReducer
});
export default reducer;
