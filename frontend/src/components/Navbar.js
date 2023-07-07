import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import "../styles/Navbar.css";
const Navbar = () => {
  const [show, setShow] = React.useState(false);
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
      <button className="hamburger" onClick={() => setShow(!show)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          fill="currentColor"
          class="bi bi-list"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
          />
        </svg>
      </button>
      <ul className={`nav-list ${show ? "": "hide-list"}`}>
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
