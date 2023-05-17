import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import { Task as TaskModel } from "./models/task";
import Task from "./components/Task";
import * as TasksApi from "./networks/task_api";
import AddEditTaskDialog from "./components/AddEditTaskDialog";
import { FaPlus } from "react-icons/fa";

function App() {
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<TaskModel | null>(null);

  async function deleteTask(task: TaskModel) {
    try {
      await TasksApi.deleteTask(task._id);
      setTasks(tasks.filter((existingTask) => existingTask._id !== task._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  useEffect(() => {
    async function loadTasks() {
      try {
        const tasks = await TasksApi.fetchTasks();
        setTasks(tasks);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    }
    loadTasks();
  }, []);
  return (
    <div className="App">
      <Container>
        <Button
          style={{ margin: "auto", display: "block", marginTop: "20px" }}
          onClick={() => {
            setShowModal(true);
          }}
        >
          <FaPlus style={{ marginRight: "10px" }} />
          Add new Task
        </Button>
        {tasks.map((task) => (
          // *It is similar to (note)=>{setTaskToEdit(note)}
          <Task
            onTaskClicked={setTaskToEdit}
            onDeleteTaskClicked={deleteTask}
            key={task._id}
            task={task}
          />
        ))}
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
            onDismiss={()=>{setTaskToEdit(null)}}
            onTaskSaved={(taskToEdit)=>{
              setTasks(tasks.map(existingTask => existingTask._id === taskToEdit._id ? taskToEdit: existingTask))
              setTaskToEdit(null);
            }}
          />
        )}
      </Container>
    </div>
  );
}

export default App;
