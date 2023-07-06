import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
    localStorage.removeItem("userInfo");
    navigate("/login");
  };
  return (
    <div className="navbar">
      <ul className="nav-list">
        <li>
          <NavLink exact="true" activeclassname="active" to="/">
            Home
          </NavLink>
        </li>
        {userInfo && userInfo.isAdmin ? null : (
          <li>
            <NavLink to="/tasks" activeclassname="active">
              Tasks
            </NavLink>
          </li>
        )}

        {userInfo && userInfo.isAdmin && (
          <li>
            <NavLink to="/users" activeclassname="active">
              Users
            </NavLink>
          </li>
        )}
        {userInfo && userInfo.isAdmin && (
          <li>
            <NavLink to="/admin" activeclassname="active">
              Admin
            </NavLink>
          </li>
        )}
        {userInfo && userInfo.isAdmin && (
          <li>
            <NavLink to="/alltasks" activeclassname="active">
              All Tasks
            </NavLink>
          </li>
        )}
        <li>
          <NavLink to="/profile" activeclassname="active">
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink to="/addtask" activeclassname="active">
            Add Task
          </NavLink>
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
