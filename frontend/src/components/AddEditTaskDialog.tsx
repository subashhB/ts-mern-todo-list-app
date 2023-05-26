import React from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { Task } from '../models/task';
import { useForm } from 'react-hook-form';
import { TaskInput } from '../networks/task_api';
import * as TaskApi from '../networks/task_api';
import TextInputField from './forms/TextInputField';

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
            <TextInputField name='title' type='text' placeholder="Title" register={register} registerOptions={{ required: "Required"}} error={errors.title} />
            <TextInputField name='description' rows={5}  as='textarea' placeholder="Description" register={register}/>
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