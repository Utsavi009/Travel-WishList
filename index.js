const express = require("express");
const validator = require("validator");
const app = express();
app.use(express.json());
const PORT = 3000;

const wishlistRouter = require('./routes/wishlistRouter');

app.use('/', wishlistRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
