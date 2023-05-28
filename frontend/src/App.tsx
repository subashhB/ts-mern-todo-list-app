import React from "react";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginModal from "./components/LoginModal";
import NavbarComponent from "./components/NavbarComponent";
import SignUpModal from "./components/SignUpModal";
import NotFoundPage from "./components/pages/NotFoundPage";
import Privacy from "./components/pages/Privacy";
import TasksPage from "./components/pages/TasksPage";
import { User } from "./models/user";
import * as TasksApi from "./networks/task_api";

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
    <BrowserRouter>
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
        <Container className="mt-3">
          <Routes>
            <Route
              path="/"
              element={<TasksPage loggedInUser={loggedInUser} />}
            />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
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
    </BrowserRouter>
  );
}

export default App;
