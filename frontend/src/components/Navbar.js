import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import "../styles/Navbar.css";
const Navbar = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {}, [userInfo]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div className="navbar">
      <ul className="nav-list">
        <li>
          <Link to="/">Home</Link>
        </li>
        {userInfo && userInfo.isAdmin ? null : (
          <li>
            <Link to="/tasks">Tasks</Link>
          </li>
        )}

        {userInfo && userInfo.isAdmin && (
          <li>
            <Link to="/users">Users</Link>
          </li>
        )}
        {userInfo && userInfo.isAdmin && (
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        )}

        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/addtask">Add Task</Link>
        </li>
        <li>
          <a href="" onClick={logoutHandler}>
            logout
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
