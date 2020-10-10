import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import appReducer from "./AppReducer";

export const reducers = combineReducers({
  appReducer,
});

export const store = createStore(reducers, applyMiddleware(logger));
