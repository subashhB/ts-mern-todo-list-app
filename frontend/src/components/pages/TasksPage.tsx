import React from "react";
import { Container } from "react-bootstrap";
import TasksPageLoggedInView from "../TasksPageLoggedInView";
import TaskPageLoggedOutView from "../TaskPageLoggedOutView";
import { User } from "../../models/user";

interface TasksPageProps{
    loggedInUser: User | null,
}

const TasksPage = ({ loggedInUser }: TasksPageProps) => {
  return (
    <Container className="mt-8">
      {loggedInUser ? <TasksPageLoggedInView /> : <TaskPageLoggedOutView />}
    </Container>
  );
};

export default TasksPage;
