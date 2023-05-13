import React from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { Task } from '../models/task';
import { useForm } from 'react-hook-form';
import { TaskInput } from '../networks/task_api';
import * as TaskApi from '../networks/task_api';

interface AddTaskDialogProps{
    onDismiss: ()=>void,
    onTaskSaved: (task: Task) => void,
}

const AddTaskDialog = ({onDismiss, onTaskSaved}: AddTaskDialogProps) => {
  const { register, handleSubmit, formState:{errors, isSubmitting}} = useForm<TaskInput>();

  async function onSubmit(input: TaskInput){
    try{
      const response = await TaskApi.createTask(input);
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
                Create a New Task To-Do
            </Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          <Form id='addTaskForm' onSubmit={handleSubmit(onSubmit)}>
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
            form='addTaskForm'
            disabled={isSubmitting}
          >
            Done
          </Button>
        </Modal.Footer>
    </Modal>
  )
}

export default AddTaskDialog;