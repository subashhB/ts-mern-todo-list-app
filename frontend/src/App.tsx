import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import { Task as TaskModel } from "./models/task";
import Task from "./components/Task";
import * as TasksApi from "./networks/task_api";
import AddEditTaskDialog from "./components/AddEditTaskDialog";
import { FaPlus } from "react-icons/fa";
import { Spinner } from "react-bootstrap";
import SignUpModal from "./components/SignUpModal";
import LoginModal from "./components/LoginModal";
import NavbarComponent from "./components/NavbarComponent";
import { User } from "./models/user";
import TasksPageLoggedInView from "./components/TasksPageLoggedInView";
import TaskPageLoggedOutView from "./components/TaskPageLoggedOutView";

function App() {
  const [loggedInUser, setLoggedInuser] = useState<User | null>(null);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    async function fetchLoggedInuser() {
      try {
        const user = await TasksApi.getLoggedInUser();
        setLoggedInuser(user);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInuser();
  }, []);

  return (
    <div className="App">
      <NavbarComponent
        loggedInUser={loggedInUser}
        onSignUpClicked={() => {
          setShowSignUpModal(true);
        }}
        onLoggedInClicked={() => {
          setShowLoginModal(true);
        }}
        onLogoutSuccessful={() => {
          setLoggedInuser(null);
        }}
      />
      <Container className="mt-8">
        {loggedInUser ? <TasksPageLoggedInView /> : <TaskPageLoggedOutView />}
      </Container>
      {showSignUpModal && (
        <SignUpModal
          onDismiss={() => {
            setShowSignUpModal(false);
          }}
          onSignUpSuccessful={(user) => {
            setLoggedInuser(user);
            setShowSignUpModal(false);
          }}
        />
      )}
      {showLoginModal && (
        <LoginModal
          onDismiss={() => {
            setShowLoginModal(false);
          }}
          onLoginSuccessful={(user) => {
            setLoggedInuser(user);
            setShowLoginModal(false);
          }}
        />
      )}
    </div>
  );
}

export default App;
