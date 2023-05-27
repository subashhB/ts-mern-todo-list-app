import React from "react";
import { User } from "../models/user";
import { useForm } from "react-hook-form";
import { LoginCredentials } from "../networks/task_api";
import * as TaskApi from "../networks/task_api";
import { Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./forms/TextInputField";

interface LoginModalProps {
  onDismiss: () => void;
  onLoginSuccessful: (user: User) => void;
}

const LoginModal = ({ onDismiss, onLoginSuccessful }: LoginModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>();

  async function onSubmit(credentials: LoginCredentials) {
    try {
      const user = await TaskApi.login(credentials);
      onLoginSuccessful(user);
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="username"
            type="text"
            placeholder = "Username"
            register={register}
            registerOptions={{ required: "Required" }}
            error={ errors.username }
          />
          <TextInputField
            name="password"
            type="password"
            placeholder="Password"
            register={register}
            registerOptions={{ required: "Required" }}
            error={ errors.password }
          />
          <Button type="submit" disabled={isSubmitting} style={{width: '100%'}} >Login</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
