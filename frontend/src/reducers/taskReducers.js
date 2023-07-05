import {
  TASK_LIST_REQUEST,
  TASK_LIST_SUCCESS,
  TASK_LIST_FAIL,
  TASK_DETAILS_REQUEST,
  TASK_DETAILS_SUCCESS,
  TASK_DETAILS_FAIL,
  TASK_DELETE_SUCCESS,
  TASK_DELETE_FAIL,
  TASK_DELETE_REQUEST,
  TASK_CREATE_REQUEST,
  TASK_CREATE_SUCCESS,
  TASK_CREATE_FAIL,
  TASK_UPDATE_REQUEST,
  TASK_UPDATE_SUCCESS,
  TASK_UPDATE_FAIL,
  TASK_LIST_MY_REQUEST,
  TASK_LIST_MY_SUCCESS,
  TASK_LIST_MY_FAIL,
} from "../constants/taskConstants";

export const taskListReducer = (state = { tasks: [] }, action) => {
  switch (action.type) {
    case TASK_LIST_REQUEST:
      return { loading: true, tasks: [] };
    case TASK_LIST_SUCCESS:
      return { loading: false, tasks: action.payload };
    case TASK_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const taskMyListReducer = (state = { tasks: [] }, action) => {
  switch (action.type) {
    case TASK_LIST_MY_REQUEST:
      return { loading: true, tasks: [] };
    case TASK_LIST_MY_SUCCESS:
      return { loading: false, tasks: action.payload };
    case TASK_LIST_MY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const taskDetailsReducer = (state = { task: {} }, action) => {
  switch (action.type) {
    case TASK_DETAILS_REQUEST:
      return { loading: true, ...state };
    case TASK_DETAILS_SUCCESS:
      return { loading: false, task: action.payload };
    case TASK_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
