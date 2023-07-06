import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TaskStatusChart from "../components/TaskStatusChart";
import TaskBarChart from "../components/TaskBarChart";
import "../styles/AdminScreen.css";
import TaskDueDateChart from "../components/TaskDueDateChart";
import { listTasks } from "../actions/taskActions";
const AdminScreen = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const allTasks = useSelector((state) => state.taskList);
  const { loading, error, tasks } = allTasks;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(listTasks());
    if (userInfo && userInfo.isAdmin) {
      console.log("Admin");
    } else {
      navigate("/");
    }
  }, [userLogin]);
  return (
    <div className="admin-screen">
      <h1>Admin Dashboard</h1>
      <div className="chart chart-1">
        <h3>Tasks Status</h3>
        <TaskStatusChart tasks={tasks} />
      </div>
      <div className="chart chart-2">
        <h3>User Load</h3>
        <TaskBarChart tasks={tasks} />
      </div>
      <div className="chart chart-3">
        <h3>Task Due Time</h3>
        <TaskDueDateChart tasks={tasks} />
      </div>
    </div>
  );
};

export default AdminScreen;
