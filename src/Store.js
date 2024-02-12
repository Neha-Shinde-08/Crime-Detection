import { createStore,combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { reducer } from "./Reducers/ImageReducer";

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
