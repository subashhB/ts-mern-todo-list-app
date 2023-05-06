import React, { useEffect, useState } from 'react';
import { Task as TaskModel } from './models/task';
import Task from './components/Task';

function App() {
  const[tasks, setTasks] = useState<TaskModel[]>([]);
  useEffect(()=>{
    async function loadTasks() {
      try{
        const res = await fetch('/api/tasks');
        const tasks = await res.json();
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
