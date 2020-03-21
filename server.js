const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config");
const mongoURI = config.mongoURI;
const port = process.env.PORT || 5000;

mongoose
	.connect(mongoURI, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log("Connect to DB successfully"))
	.catch(err => console.log(err));

const app = express();

app.use(express.json());

app.use("/api", cors(), require("./routes/api"));

app.listen(port, () => console.log(`Server is running on port ${port}`));
