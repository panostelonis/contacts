import React from "react";
//import  { useState, useEffect } from "react";
import { Nav, Navbar, Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

//import getAll from './utils';

import { ContactsList, ContactsForm } from "./components";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>
                <Link to={"/"} className="nav-link">
                  Home
                </Link>
              </Navbar.Brand>

              <Nav className="justify-content-end">
                <Nav>
                  <Link to={"/contacts-list"} className="nav-link">
                    Contacts List
                  </Link>
                </Nav>
                <Nav>
                  <Link to={"/create-contact"} className="nav-link">
                    Create Contact
                  </Link>
                </Nav>
              </Nav>
            </Container>
          </Navbar>
        </header>

        <Container>
          <Row>
            <Col md={12}>
              <div className="wrapper">
                <Switch>
                  <Route exact path="/" component={ContactsList} />
                  <Route path="/contacts-list" component={ContactsList} />
                  <Route path="/edit-contact/:id" component={ContactsForm} />
                  <Route path="/create-contact" component={ContactsForm} />
                </Switch>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Router>
  );
}

export default App;
