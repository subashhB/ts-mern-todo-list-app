import React from "react";
import { Task as TaskModel } from "../models/task";
import { formatDate } from "../utils/formatDate";
import { MdDelete } from "react-icons/md";

interface TaskProps {
  task: TaskModel;
  onTaskClicked: (task: TaskModel) => void;
  onDeleteTaskClicked: (task: TaskModel) => void;
}

const Task = ({ task, onTaskClicked, onDeleteTaskClicked }: TaskProps) => {
  let createdUpdatedText: string;
  if (task.updatedAt > task.createdAt) {
    createdUpdatedText = `Updated: ${formatDate(task.updatedAt)}`;
  } else {
    createdUpdatedText = `Created: ${formatDate(task.createdAt)}`;
  }
  return (
    <div
      className={
        task.completed ? "todo-list-completed" : "todo-list-incomplete"
      }
      onClick={() => {
        onTaskClicked(task);
      }}
    >
      <h4>{task.title}</h4>{" "}
      <span className="status">{task.completed ? "Completed" : "ToDo"}</span>
      <MdDelete
        className="delete-button"
        onClick={(e) => {
          onDeleteTaskClicked(task);
          e.stopPropagation();
        }}
      />
      <p>{task.description}</p>
      <hr className="task-hr" />
      <p style={{ fontSize: "0.8em", opacity: "0.7" }}>{createdUpdatedText}</p>
    </div>
  );
};

export default Task;
