import React from "react";
import { Button } from "react-bootstrap";

//import { deleteContact } from "../utils";

const Contact = ({ contact, onChildClick }) => {
  const { _id, name, email, address, phones } = contact;

  const handleClick = (id) => {
    onChildClick(id);
  };

  return (
    <tr>
      <td>{name}</td>
      <td>{email}</td>
      <td>{address}</td>
      <td>
        {phones.map((phone, i) => (phone ? <p key={i}>{phone}</p> : null))}
      </td>
      <td>
        <Button href={"/edit-contact/" + _id} size="sm">
          Edit
        </Button>{" "}
        <Button onClick={() => handleClick(_id)} size="sm" variant="danger">
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default Contact;
