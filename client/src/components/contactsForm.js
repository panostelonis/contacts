import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

import { createContact, getContact, updateContact } from "../utils/service";

export default class ContactsForm extends Component {
  constructor(props) {
    super(props);

    // Setting up functions
    this.onChange = this.onChange.bind(this);
    this.onPhoneChange = this.onPhoneChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.defaultState = {
      name: "",
      email: "",
      address: "",
      phones: []
    };

    // Setting up state
    this.state = {
      ...this.defaultState,
    };
  }

  componentDidMount() {
    const { match } = this.props;

    if (match.params.id !== undefined) {
      getContact(match.params.id).then((contact) =>
        this.setState({
          name: contact.name,
          email: contact.email,
          address: contact.address,
          phones: contact.phones,
        })
      );
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.match.params.id !== undefined &&
      this.props.match.params.id === undefined
    ) {
      this.setState({
        ...this.defaultState,
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  onPhoneChange(i, e) {
    //const re = /^[0-9\b]+$/;
    const phones = [...this.state.phones];

    //if (
    //  (e.target.value === "" || re.test(e.target.value)) &&
    //  phones[i].length < 10
    //) {
      phones[i] = e.target.value;
      this.setState({ phones });
    //} 
  }

  addPhone() {
    this.setState((prevState) => ({
      phones: prevState.phones ? [...prevState.phones, ""] : [""],
    }));
  }

  removePhone(i) {
    const phones = [...this.state.phones];
    phones.splice(i, 1);
    this.setState({ phones });
  }

  onSubmit(e) {
    e.preventDefault();

    const { match } = this.props;
    const { name, email, address, phones } = this.state;

    const contact = {
      name,
      email,
      address,
      phones,
    };

    if (match.params.id !== undefined) {
      updateContact(match.params.id, contact);
    } else {
      createContact(contact);
    }

    // Redirect to Contacts List
    this.props.history.push("/contacts-list");
  }

  render() {
    const { match } = this.props;
    const { name, email, address, phones } = this.state;

    return (
      <div className="form-wrapper">
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name*</Form.Label>
            <Form.Control
              required
              type="text"
              value={name || ""}
              onChange={this.onChange}
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email*</Form.Label>
            <Form.Control
              required
              type="email"
              value={email || ""}
              onChange={this.onChange}
            />
          </Form.Group>

          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              value={address || ""}
              onChange={this.onChange}
            />
          </Form.Group>

          {phones &&
            phones.map((phone, i) => (
              <div key={i}>
                <Form.Group>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="number"
                    value={phone}
                    onChange={this.onPhoneChange.bind(this, i)}
                  />
                </Form.Group>
                <Button size="sm" onClick={this.removePhone.bind(this, i)}>
                  Delete
                </Button>
              </div>
            ))}

          <Button size="sm" onClick={this.addPhone.bind(this)}>
            Add phone
          </Button>

          <Button variant="danger" size="sm" type="submit">
            {match.params.id !== undefined ? "Save" : "Create"}
          </Button>
        </Form>
      </div>
    );
  }
}
