import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Switch, Route, NavLink } from "react-router-dom";
import CadastrarPauta from "./CadastrarPauta";
import Vote from "./Vote";
import Home from "./Home";
import Results from "./Results";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  Button,
  FormControl
} from "react-bootstrap";

function App() {
  const logout = () => {
    localStorage.removeItem("userId");
    alert("Saiu!");
  };

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Heróis Marvel</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Heróis</Nav.Link>
            {/* <Nav.Link href="/cadastrar-pauta">Cadastrar Pauta</Nav.Link>
            <Nav.Link href="/votar">Votar</Nav.Link>
            <Nav.Link href="/resultados">Resultados</Nav.Link>
            <Nav.Link href="/" onClick={() => logout()}>
              Sair
            </Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* {localStorage.getItem("userId") ? ( */}
      <BrowserRouter>
        <div>
          <Route path="/" exact component={Home} />
        </div>
        {/* <div>
            <Route path="/resultados" exact component={Results} />
          </div> */}
      </BrowserRouter>
      {/* ) : (
        <BrowserRouter>
          <div>
            <Route path="/" component={Home} />
          </div>
        </BrowserRouter>
      )} */}
    </div>
  );
}

export default App;
