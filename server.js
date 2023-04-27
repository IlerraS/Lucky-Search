const express = require('express');
const app = express();
const path = require('path');
const router = require('./searchRouter.js');

//midleware for json
app.use(express.json());

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', router);

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});