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
      <div className="home-page">
        <h1 className="home-page__title">Task Management System</h1>
        <p className="home-page__description">
          Welcome {user && user.name} to the Task Management System! Manage your
          tasks efficiently.
        </p>
        <div className="home-page__features">
          <div className="home-page__feature">
            <h2 className="home-page__feature-title">Create Tasks</h2>
            <p className="home-page__feature-description">
              Easily create new tasks and assign them to different categories or
              projects.
            </p>
          </div>
          <div className="home-page__feature">
            <h2 className="home-page__feature-title">Track Progress</h2>
            <p className="home-page__feature-description">
              Monitor the progress of your tasks and keep track of pending,
              completed, and upcoming tasks.
            </p>
          </div>
          <div className="home-page__feature">
            <h2 className="home-page__feature-title">
              Collaborate with Others
            </h2>
            <p className="home-page__feature-description">
              Share tasks and collaborate with team members, enabling seamless
              task management and coordination.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
