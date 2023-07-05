import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/ProfileScreen.css";
import "../styles/LoginScreen.css";
import { updateUser } from "../actions/userActions";
const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo } = userLogin;
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = {
      id: userInfo._id,
      name,
      email,
      password,
    };
    dispatch(updateUser(updatedUser));
    setIsEditing(false);
  };
  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userLogin]);
  return (
    <div className="profileScreen">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="loginForm">
          <div className="input-container">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="submit">
            Update
          </button>
        </form>
      ) : (
        <div className="user-info-container">
          <p className="user-info-label">Name:</p>
          <p className="user-info-value">{userInfo.name}</p>
          <p className="user-info-label">Email:</p>
          <p className="user-info-value">{userInfo.email}</p>
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileScreen;
