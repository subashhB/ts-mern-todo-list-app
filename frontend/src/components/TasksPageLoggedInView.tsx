import React, { useEffect, useState } from "react";
import { Task as TaskModel } from "../models/task";
import { Button, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import AddEditTaskDialog from "./AddEditTaskDialog";
import * as TasksApi from "../networks/task_api";
import Task from "./Task";

const TasksPageLoggedInView = () => {
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const [taskLoading, setTaskLoading] = useState(false);
  const [showTaskLoadingError, setShowTaskLoadingError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<TaskModel | null>(null);

  useEffect(() => {
    async function loadTasks() {
      try {
        setShowTaskLoadingError(false);
        setTaskLoading(true);
        const tasks = await TasksApi.fetchTasks();
        setTasks(tasks);
      } catch (error) {
        console.log(error);
        setShowTaskLoadingError(true);
      } finally {
        setTaskLoading(false);
      }
    }
    loadTasks();
  }, []);

  async function deleteTask(task: TaskModel) {
    try {
      await TasksApi.deleteTask(task._id);
      setTasks(tasks.filter((existingTask) => existingTask._id !== task._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  async function completeTask(task: TaskModel) {
    try {
      await TasksApi.completeTask(task._id);
      setTasks(
        tasks.map((existingTask) =>
          existingTask._id === task._id
            ? { ...existingTask, completed: true }
            : existingTask
        )
      );
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  const tasksGrid = (
    <>
      {tasks.map((task) => (
        // *It is similar to (note)=>{setTaskToEdit(note)}
        <Task
          onTaskClicked={setTaskToEdit}
          onCompleteTaskClicked={completeTask}
          onDeleteTaskClicked={deleteTask}
          key={task._id}
          task={task}
        />
      ))}
    </>
  );
  return (
    <>
      <Button
        style={{ margin: "auto", display: "block", marginTop: "20px" }}
        onClick={() => {
          setShowModal(true);
        }}
      >
        <FaPlus style={{ marginRight: "10px" }} />
        Add new Task
      </Button>
      {taskLoading && <Spinner animation="border" variant="primary" />}
      {showTaskLoadingError && (
        <p>Something went wrong. Please refresh the page.</p>
      )}
      {!taskLoading && !showTaskLoadingError && (
        <>{tasks.length > 0 ? tasksGrid : <p>Wow, such empty.</p>}</>
      )}
      {showModal && (
        <AddEditTaskDialog
          onDismiss={() => setShowModal(false)}
          onTaskSaved={(newTask) => {
            console.log(showModal);
            setTasks([...tasks, newTask]);
            setShowModal(false);
          }}
        />
      )}
      {taskToEdit && (
        <AddEditTaskDialog
          taskToEdit={taskToEdit}
          onDismiss={() => {
            setTaskToEdit(null);
          }}
          onTaskSaved={(taskToEdit) => {
            setTasks(
              tasks.map((existingTask) =>
                existingTask._id === taskToEdit._id ? taskToEdit : existingTask
              )
            );
            setTaskToEdit(null);
          }}
        />
      )}
    </>
  );
};

export default TasksPageLoggedInView;
