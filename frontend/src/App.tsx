import React, { useEffect, useState } from 'react';
import './App.css';
import { Task } from './models/task';

function App() {
  const[tasks, setTasks] = useState<Task[]>([]);
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
      {JSON.stringify(tasks) }
    </div>
  );
}

export default App;
