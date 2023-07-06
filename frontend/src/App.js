import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import TasksScreen from "./screens/TasksScreen";
import AddTaskScreen from "./screens/AddTaskScreen";
import EditTaskScreen from "./screens/EditTaskScreen";
import ProfileScreen from "./screens/ProfileScreen";
import UsersScreen from "./screens/UsersScreen";
import AdminScreen from "./screens/AdminScreen";
import AllTasksScreen from "./screens/AllTasksScreen";
function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {}, [userLogin]);

  return (
    <>
      <BrowserRouter>
        {userInfo ? <Navbar /> : null}
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/tasks" element={<TasksScreen />} />
          <Route path="/addtask" element={<AddTaskScreen />} />
          <Route path="/edittask/:id" element={<EditTaskScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/users" element={<UsersScreen />} />
          <Route path="/admin" element={<AdminScreen />} />
          <Route path="/alltasks" element={<AllTasksScreen />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
