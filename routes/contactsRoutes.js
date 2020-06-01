const mongoose = require("mongoose");
const Contacts = mongoose.model("contacts");

module.exports = (app) => {
  // @route    GET /api/get-contacts
  // @desc     Returns the contacts list
  app.get(`/api/get-contacts`, async (req, res) => {
    try {
      const contacts = await Contacts.find();
      return res.status(200).send(contacts);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  });

  // @route    GET /api/get-contact/:id
  // @desc     Returns a particular contact
  app.get(`/api/get-contact/:id`, async (req, res) => {
    const { id } = req.params;
    try {
      const contact = await Contacts.findById(id);
      return res.status(200).send(contact);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  });

  // @route    POST /api/contact
  // @desc     Creates a new contact
  app.post(`/api/create-contact`, async (req, res) => {
    try {
      const contact = await Contacts.create(req.body);
      return res.status(201).send({
        error: false,
        contact,
      });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  });

  // @route    PUT /api/contact/:id
  // @desc     Updates a contact
  app.put(`/api/update-contact/:id`, async (req, res) => {
    const { id } = req.params;

    try {
      const contact = await Contacts.findByIdAndUpdate(id, req.body);
      return res.status(202).send({
        error: false,
        contact,
      });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  });

  // @route    DELETE /api/contact/:id
  // @desc     Deletes a contact
  app.delete(`/api/delete-contact/:id`, async (req, res) => {
    const { id } = req.params;

    try {
      const contact = await Contacts.findByIdAndDelete(id);
      return res.status(202).send({
        error: false,
        contact,
      });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  });
};
