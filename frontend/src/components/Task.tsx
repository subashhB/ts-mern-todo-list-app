import React from 'react'
import { Task as TaskModel } from '../models/task'

interface TaskProps {
    task: TaskModel
}

const Task = ({ task }: TaskProps) => {
  return (
    <div className={task.completed ? 'todo-list-completed': 'todo-list-incomplete' }>
        <h4>{ task.title }</h4>
        <p>{ task.description }</p>
    </div>
  )
}

export default Task