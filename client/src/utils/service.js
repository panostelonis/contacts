import axios from "axios";

//Get contacts list
export const getAllContacts = async () => {
  const res = await axios.get(`/api/get-contacts`);
  console.log("Get contacts");
  return res.data || [];
};

//Create new contact
export const createContact = async (contact) => {
  const res = await axios.post("/api/create-contact", contact);
  console.log("Create app");
  return res.data || [];
};

//Delete current contact
export const deleteContact = (id) => {
  axios
    .delete("/api/delete-contact/" + id)
    .then((res) => {
      console.log("Contact successfully deleted!");
    })
    .catch((error) => {
      console.log(error);
    });
};

//Get current contact
export const getContact = (id) => {
  return axios
    .get("/api/get-contact/" + id)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

//Update current contact
export const updateContact = async (id, contact) => {
  const res = await axios.put("/api/update-contact/" + id, contact);
  console.log("Update contact");
  return res.data | [];
};
