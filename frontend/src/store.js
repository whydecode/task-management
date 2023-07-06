import thunk from "redux-thunk";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  userLoginReducer,
  userRegisterReducer,
  userListReducer,
  userUpdateProfileReducer,
  userDeleteReducer,
} from "./reducers/userReducers";
import {
  taskListReducer,
  taskMyListReducer,
  taskDetailsReducer,
} from "./reducers/taskReducers";

// Get user info from local storage
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userList: userListReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userDelete: userDeleteReducer,
  taskList: taskListReducer,
  taskMyList: taskMyListReducer,
  taskDetails: taskDetailsReducer,
});

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

export const store = configureStore({
  reducer,
  middleware,
  preloadedState: initialState,
});
