import React, { useState, useEffect } from "react";
import { Table, Container } from "react-bootstrap";

import Contact from "./contact";
import { deleteContact, getAllContacts } from "../utils/service";
import { MESSAGES } from "../constants";

export default function ContactsList() {
  const [contacts, setContacts] = useState(null);

  useEffect(() => {
    getContacts();
  }, []);

  const getContacts = async () => {
    const res = await getAllContacts();
    setContacts(res);
  };

  const handleChildClick = (id) => {
    deleteContact(id);
    setContacts(contacts.filter((contact) => contact._id !== id));
  };

  return (
    <Container>
      {!contacts ? (
        <p>{MESSAGES.LOADING}</p>
      ) : contacts.length > 0 ? (
        <div className="table-wrapper">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phones</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, i) => (
                <Contact
                  contact={contact}
                  key={i}
                  onChildClick={(e) => handleChildClick(e)}
                />
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <p>{MESSAGES.NO_CONTACTS}</p>
      )}
    </Container>
  );
}
