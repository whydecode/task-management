import React, { useState, useEffect } from "react";
import "../styles/TaskScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, listTasks } from "../actions/taskActions";
import Circles from "../components/Circles";
import { Link, useNavigate } from "react-router-dom";
import { listUsers } from "../actions/userActions";
import { motion, useAnimation } from "framer-motion";

const AllTasksScreen = () => {
  const allTasks = useSelector((state) => state.taskList);
  const { loading, error, tasks } = allTasks;
  const userList = useSelector((state) => state.userList);
  const { users } = userList;
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [taskList, setTaskList] = useState([]);
  const [status, setStatus] = useState("");
  const [assignedUser, setAssignedUser] = useState("");
  const handleDeleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTask(id));
    }
  };
  useEffect(() => {
    dispatch(listTasks());
    dispatch(listUsers());
  }, [dispatch]);

  useEffect(() => {
    setTaskList(tasks);
  }, [tasks]);
  useEffect(() => {
    if (taskList && users) {
      const updatedTaskList = taskList.map((task) => {
        const assignedUser = users.find(
          (user) => task.assignedUser === user._id
        );
        if (assignedUser) {
          return { ...task, assignedUser: assignedUser.name };
        }
        return task;
      });

      if (JSON.stringify(updatedTaskList) !== JSON.stringify(taskList)) {
        setTaskList(updatedTaskList);
      }
    }
  }, [taskList, users]);

  const controls = useAnimation();
  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.12, // Delay each row by 0.2 seconds
      },
    }));
  }, [controls, taskList]);

  const handleFilter = (e) => {
    e.preventDefault();
    let filteredTasks = tasks;
    if (status && status !== "") {
      filteredTasks = filteredTasks.filter((task) => task.status === status);
    }
    if (assignedUser && assignedUser !== "") {
      filteredTasks = filteredTasks.filter(
        (task) => task.assignedUser === assignedUser
      );
    }
    setTaskList(filteredTasks);
  };
  const handleReset = (e) => {
    e.preventDefault();
    setTaskList(tasks);
  };

  const handleSort = (e) => {
    e.preventDefault();
    const sortedTasks = [...taskList];
    if (e.target.value === "title") {
      sortedTasks.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
    } else if (e.target.value === "dueDate") {
      sortedTasks.sort((a, b) => {
        if (a.dueDate < b.dueDate) {
          return -1;
        }
        if (a.dueDate > b.dueDate) {
          return 1;
        }
        return 0;
      });
    } else if (e.target.value === "status") {
      sortedTasks.sort((a, b) => {
        if (a.status < b.status) {
          return -1;
        }
        if (a.status > b.status) {
          return 1;
        }
        return 0;
      });
    } else if (e.target.value === "assignedUser") {
      sortedTasks.sort((a, b) => {
        if (a.assignedUser < b.assignedUser) {
          return -1;
        }
        if (a.assignedUser > b.assignedUser) {
          return 1;
        }
        return 0;
      });
    }
    setTaskList(sortedTasks);
  };

  return (
    <>
      {loading ? (
        <Circles />
      ) : (
        <div className="task-screen">
          <h1>All Tasks</h1>
          <div className="filter-div">
            <form
              action=""
              className="filter"
              onSubmit={handleFilter}
              onReset={handleReset}
            >
              <label htmlFor="status">Status</label>
              <select
                name="status"
                id="status"
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              >
                <option value="">All</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              </select>
              <label htmlFor="assignedUser">Assigned User</label>
              <select
                name="assignedUser"
                id="assignedUser"
                onChange={(e) => {
                  setAssignedUser(e.target.value);
                }}
              >
                <option value="">All</option>
                {users &&
                  users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name}
                    </option>
                  ))}
              </select>
              <button type="submit"> Filter</button>
              <button type="reset">Reset</button>
            </form>
            <form action="" className="sort">
              <label htmlFor="sort">Sort By</label>
              <select
                name="sort"
                id="sort"
                onChange={(e) => {
                  handleSort(e);
                }}
              >
                <option value="">None</option>
                <option value="title">Title</option>
                <option value="dueDate">Due Date</option>
                <option value="status">Status</option>
                <option value="assignedUser">Assigned User</option>
              </select>
              <input
                type="text"
                placeholder="Search..."
                name="search"
                onChange={(e) => {
                  const filteredTasks = tasks.filter((task) =>
                    task.title
                      .toLowerCase()
                      .includes(e.target.value.toLowerCase())
                  );
                  setTaskList(filteredTasks);
                }}
              />
            </form>
          </div>
          {taskList && tasks.length > 0 ? (
            <table className="task-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Assigned User</th>
                  <th>Edit/Delete</th>
                </tr>
              </thead>
              <tbody>
                {taskList.map((task, index) => (
                  <motion.tr
                    key={task._id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={controls}
                    custom={index}
                  >
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td className="data-center">
                      {new Date(task.dueDate).toLocaleDateString("en-GB")}
                    </td>
                    <td className="data-center">{task.status}</td>
                    <td className="data-center">{task.assignedUser}</td>
                    <td className="data-center">
                      <Link to={`/edittask/${task._id}`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-pencil-square"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path
                            fillRule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                          />
                        </svg>
                      </Link>
                      <a onClick={() => handleDeleteTask(task._id)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-trash"
                          viewBox="0 0 16 16"
                        >
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                        </svg>
                      </a>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h1>No tasks found</h1>
          )}
        </div>
      )}
    </>
  );
};

export default AllTasksScreen;
