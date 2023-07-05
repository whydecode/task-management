import axios from "axios";
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
import { logout } from "./userActions";

export const listTasks = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASK_LIST_REQUEST,
    });
    const { data } = await axios.get("http://localhost:5000/api/tasks");
    dispatch({
      type: TASK_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TASK_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listMyTask = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASK_LIST_MY_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const response = await axios.get(
      "http://localhost:5000/api/tasks/mytasks",
      config
    );

    dispatch({
      type: TASK_LIST_MY_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: TASK_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addTask = (task) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASK_CREATE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const response = await axios.post(
      "http://localhost:5000/api/tasks",
      task,
      config
    );
    dispatch({
      type: TASK_CREATE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: TASK_CREATE_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const deleteTask = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASK_DELETE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`http://localhost:5000/api/tasks/${id}`, config);
    dispatch({
      type: TASK_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: TASK_DELETE_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const getTaskDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASK_DETAILS_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const response = await axios.get(
      `http://localhost:5000/api/tasks/${id}`,
      config
    );
    dispatch({
      type: TASK_DETAILS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: TASK_DETAILS_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
