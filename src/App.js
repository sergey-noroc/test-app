import React from "react";
import TopBar from "./components/TopBar";
import Container from "@material-ui/core/Container";
import Routes from "./routes";
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
      <Router>
          <TopBar />
          <Container>
              <Routes />
          </Container>
      </Router>
  );
}

export default App;
