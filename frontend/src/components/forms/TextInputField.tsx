import React from 'react'
import { Form } from 'react-bootstrap'
import { FieldError, RegisterOptions, UseFormRegister } from 'react-hook-form'

interface TextInputFieldProps{
    name: string,
    register: UseFormRegister<any>,
    registerOptions?: RegisterOptions,
    error?: FieldError,
    [x: string]: any,
}

const TextInputField = ({ name, register, registerOptions, error, ...props }: TextInputFieldProps) => {
  return (
    <Form.Group className='mb-3' controlId={name+'-input'}>
      <Form.Control
        { ...props }
        { ...register(name, ) }
        isInvalid = {!!error}
      />
      <Form.Control.Feedback type='invalid'>
        { error && error.message }
      </Form.Control.Feedback>
    </Form.Group>
  )
}

export default TextInputField