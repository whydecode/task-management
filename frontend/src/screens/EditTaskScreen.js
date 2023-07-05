import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { listUsers } from "../actions/userActions";
import { getTaskDetails } from "../actions/taskActions";

const EditTaskScreen = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignedUser, setAssignedUser] = useState("");
  const [status, setStatus] = useState("");
  const userList = useSelector((state) => state.userList);
  const { users } = userList;
  const taskDetails = useSelector((state) => state.taskDetails);
  const { loading, task } = taskDetails;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUsers());
    dispatch(getTaskDetails(id));
    if (task) {
      if (task.dueDate) {
        const selectedDate = new Date(task.dueDate);
        const formattedDate = selectedDate.toISOString().split("T")[0];
        setTitle(task.title);
        setDescription(task.description);
        setDueDate(formattedDate);
        setAssignedUser(task.assignedUser);
        setStatus(task.status);
      }
    }
  }, [dispatch, loading]);
  const handleEditTask = (e) => {
    e.preventDefault();
  };

  return (
    <div className="AddTaskScreen">
      <form onSubmit={handleEditTask} className="add-task-form">
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
            value={assignedUser}
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
          <select onChange={(e) => setStatus(e.target.value)} value={status}>
            <option value="">Select Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <button className="addTask" type="submit">
          Update Task
        </button>
      </form>
    </div>
  );
};

export default EditTaskScreen;
