import React, { Component } from "react";
import { Form, Button } from 'react-bootstrap';

import { createContact } from '../utils';

export default class CreateContact extends Component {

  constructor(props) {
    super(props)

    // Setting up functions
    this.onChange = this.onChange.bind(this);
    this.onPhoneChange = this.onPhoneChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      name: '',
      email: '',
      address: '',
      phones: [],
    }
  }

  onChange(e) {
    this.setState({ [e.target.id]: e.target.value })
  }

  onPhoneChange(i, event) {
    const phones = [...this.state.phones];
    phones[i] = event.target.value;
    this.setState({ phones })
  }

  addPhone() {
    this.setState(prevState => ({ phones: [...prevState.phones, '']}))
  }

  removePhone(i) {
    const phones = [...this.state.phones];
    phones.splice(i,1);
    this.setState({ phones });
  }

  onSubmit(e) {
    e.preventDefault()

    const {name, email, address, phones } = this.state

    const contact = {
      name,
      email,
      address,
      phones
    };

    createContact(contact)
    
    // Redirect to Contacts List 
    this.props.history.push('/contacts-list')
  }

  render() {

    const {name, email, address, phones } = this.state

    return (
      <div className="form-wrapper">
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={name} onChange={this.onChange} />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={this.onChange} />
          </Form.Group>

          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" value={address} onChange={this.onChange} />
          </Form.Group>

          {phones.map((phone, i) =>
            <div key={i}>
              <Form.Group>
                <Form.Label>Phone</Form.Label>
                <Form.Control type="text" value={phone} onChange={this.onPhoneChange.bind(this, i)} />
              </Form.Group>
              <Button size="sm" onClick={this.removePhone.bind(this, i)}>
                Delete
              </Button>
            </div>
          )}

          <Button size="sm" onClick={this.addPhone.bind(this)}>
            Add phone
          </Button>

          <Button variant="danger" size="lg" block="block" type="submit">
            Create
          </Button>
        </Form>
      </div>
    );
  }
}