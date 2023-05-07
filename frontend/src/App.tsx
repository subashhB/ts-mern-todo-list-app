import React, { useEffect, useState } from 'react';
import { Task as TaskModel } from './models/task';
import Task from './components/Task';
import * as TasksApi from './networks/task_api';

function App() {
  const[tasks, setTasks] = useState<TaskModel[]>([]);
  useEffect(()=>{
    async function loadTasks() {
      try{
        const tasks = await TasksApi.fetchTasks();
        setTasks(tasks);
      }catch(error){
        console.log(error);
        alert(error);
      }
    }
    loadTasks();
  },[]);
  return (
    <div className="App">
      {tasks.map(task => (<Task key={task._id} task = {task}/>)) }
    </div>
  );
}

export default App;
