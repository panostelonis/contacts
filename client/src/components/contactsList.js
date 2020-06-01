import React, { useState, useEffect } from "react";
import { Table, Container } from "react-bootstrap";

import Contact from "./contact";
import { getAllContacts } from "../utils";

export default function ContactsList() {
  const [contacts, setContacts] = useState(null);

  useEffect(() => {
    getContacts();
  }, []);

  const getContacts = async () => {
    const res = await getAllContacts();
    //console.log(res);
    setContacts(res);
  };

  return (
    <Container>
      {contacts && contacts.length > 0 ? (
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
                <Contact contact={contact} key={i} />
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <p>No contacts found</p>
      )}
    </Container>
  );
}
