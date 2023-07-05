import React, { useEffect, useState } from "react";
import "../styles/HomeScreen.css";
import { useNavigate } from "react-router-dom";
const HomeScreen = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const loggedInUser = localStorage.getItem("userInfo");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <div className="header">
        <h1>Task Management System</h1>
        {user && <h3>Welcome {user.name}</h3>}
      </div>
    </div>
  );
};

export default HomeScreen;
