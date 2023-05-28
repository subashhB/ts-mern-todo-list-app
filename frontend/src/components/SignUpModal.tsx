import React, { useState } from "react";
import { User } from "../models/user";
import { useForm } from "react-hook-form";
import { SignUpCredentials } from "../networks/task_api";
import * as TasksApi from "../networks/task_api";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./forms/TextInputField";
import { ConflictError } from "./errors/http_error";

interface SignUpModalProps {
  onDismiss: () => void;
  onSignUpSuccessful: (user: User) => void;
}

const SignUpModal = ({ onDismiss, onSignUpSuccessful }: SignUpModalProps) => {

  const [errorText, setErrorText] = useState<string|null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpCredentials>();

  async function onSubmit(credentials: SignUpCredentials) {
    try {
      const newUser = await TasksApi.signUp(credentials);
      onSignUpSuccessful(newUser);
    } catch (error) {
      if(error instanceof ConflictError){
        setErrorText(error.message);
      }else{
        alert(error);
      }
      console.error(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { errorText && <Alert variant="danger">{ errorText }</Alert> }
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="username"
            type="text"
            placeholder="Username"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.username}
          />
          <TextInputField
            name="email"
            type="email"
            placeholder="E-mail"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.email}
          />
          <TextInputField
            name="password"
            type="password"
            placeholder="Password"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.password}
          />
          <Button type="submit" disabled={isSubmitting} style={{width: '100%'}}> Sign Up</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SignUpModal;
