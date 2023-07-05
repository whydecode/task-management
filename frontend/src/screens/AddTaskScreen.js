import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../actions/taskActions";
import { listUsers } from "../actions/userActions";
import "../styles/AddTaskScreen.css";
const AddTaskScreen = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignedUser, setAssignedUser] = useState("");
  const [status, setStatus] = useState("");
  const userList = useSelector((state) => state.userList);
  const { users } = userList;

  const dispatch = useDispatch();
  const handleAddTask = (e) => {
    e.preventDefault();
    const task = {
      title,
      description,
      dueDate,
      assignedUser,
      status,
    };
    console.log(task);
    dispatch(addTask(task));
  };
  useEffect(() => {
    dispatch(listUsers());
  }, []);
  return (
    <div className="AddTaskScreen">
      <form onSubmit={handleAddTask} className="add-task-form">
        <p className="form-title">Add Task Details</p>
        <div className="form-field">
          <label htmlFor="title">Title</label>
          <input
            name="title"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="description">Description</label>
          <input
            name="description"
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="date">Date</label>
          <input
            name="date"
            type="date"
            placeholder="Date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="assignedUser">Assigned User</label>
          <select
            name="assignedUser"
            onChange={(e) => setAssignedUser(e.target.value)}
          >
            <option value="">Select User</option>
            {users &&
              users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="status">Status</label>
          <select onChange={(e) => setStatus(e.target.value)}>
            <option value="">Select Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <button className="addTask" type="submit">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTaskScreen;
