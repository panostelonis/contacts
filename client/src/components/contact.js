import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { deleteContact } from '../utils'

const Contact = ({ contact }) => {
  const { _id, name, email, address, phones } = contact

  const deleteAndRefresh = (id) => {
    deleteContact(id)
    window.location.reload(false);
  }

  return (
      <tr>
          <td>{name}</td>
          <td>{email}</td>
          <td>{address}</td>
          <td>{phones.map(phone => phone ? <p>{phone}</p> : null)}</td>
          <td>
              <Link className="edit-link" to={"/edit-contact/" + _id}>
                  Edit
              </Link>
              <Button onClick={() => deleteAndRefresh(_id)} size="sm" variant="danger">Delete</Button>
          </td>
      </tr>
  );

}

export default Contact