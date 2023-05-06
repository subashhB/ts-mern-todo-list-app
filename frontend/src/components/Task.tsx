import React from 'react'
import { Task as TaskModel } from '../models/task'
import { formatDate } from '../utils/formatDate';

interface TaskProps {
    task: TaskModel
}

const Task = ({ task }: TaskProps) => {
    let createdUpdatedText: string;
    if(task.updatedAt > task.createdAt){
        createdUpdatedText = `Updated: ${formatDate(task.updatedAt)}`
    }else{
        createdUpdatedText = `Created: ${formatDate(task.createdAt)}`
    }
  return (
    <div className={task.completed ? 'todo-list-completed': 'todo-list-incomplete' }>
        <h4>{ task.title }</h4> <span className='status'>{task.completed ? 'Completed': 'ToDo'}</span>
        <p>{ task.description }</p>
        <hr/>
        <p style={{fontSize: '0.8em', opacity: '0.7'}}>{ createdUpdatedText }</p>
    </div>
  )
}

export default Task