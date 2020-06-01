const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('./models/Contacts');

const app = express();
const uri = `mongodb+srv://contactsUser:aRPnuRblKFPJN8Kr@cluster0-nklmf.mongodb.net/test?retryWrites=true&w=majority`

mongoose.Promise = global.Promise;

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI || uri, {
			useNewUrlParser: true,
			//useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		});

		console.log('MongoDB Connected...');
	} catch (err) {
		console.error(err.message);
		// Exit process with failure
		process.exit(1);
	}
};

connectDB();

app.use(bodyParser.json());

//IMPORT ROUTES
require('./routes/contactsRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req,res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })

}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});
