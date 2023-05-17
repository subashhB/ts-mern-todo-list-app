import React from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { Task } from '../models/task';
import { useForm } from 'react-hook-form';
import { TaskInput } from '../networks/task_api';
import * as TaskApi from '../networks/task_api';

interface AddEditTaskDialogProps{
    taskToEdit?: Task,
    onDismiss: ()=>void,
    onTaskSaved: (task: Task) => void,
}

const AddEditTaskDialog = ({taskToEdit, onDismiss, onTaskSaved}: AddEditTaskDialogProps) => {
  const { register, handleSubmit, formState:{errors, isSubmitting}} = useForm<TaskInput>({
    defaultValues: {
      title: taskToEdit && taskToEdit.title ? taskToEdit.title : "",
      description: taskToEdit && taskToEdit.description ? taskToEdit.description : "",
    }
  });

  async function onSubmit(input: TaskInput){
    try{
      let response: Task;
      if(taskToEdit){
        response = await TaskApi.updateTask(taskToEdit._id, input);
      }else{
        response = await TaskApi.createTask(input);
      }
       
      onTaskSaved(response);
      
    }catch(error){
      console.error(error);
      alert(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
        <Modal.Header closeButton>
            <Modal.Title>
                { taskToEdit ? "Edit Task" : "Create a New Task To-Do"}
            </Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          <Form id='addEditTaskForm' onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" >
              <Form.Control
                type="text"
                placeholder='Title'
                isInvalid={!!errors.title}
                {...register("title", { required: "Required"})}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.title && errors.title.message}
              </Form.Control.Feedback >
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder='Description'
                {...register("description")}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type='submit'
            form='addEditTaskForm'
            disabled={isSubmitting}
          >
            Done
          </Button>
        </Modal.Footer>
    </Modal>
  )
}

export default AddEditTaskDialog;