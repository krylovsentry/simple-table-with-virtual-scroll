const express = require('express');
const bodyParser = require("body-parser");
const fs = require('fs');
const PORT = 3080;


const app = express();
app.use(bodyParser.urlencoded({
  parameterLimit: 100000,
  limit: '50mb',
  extended: true
}));

app.get('/api/data', (req, res) => {
  let rawdata = fs.readFileSync('src/assets/data.json');
  res.json(JSON.parse(rawdata));
});

app.listen(PORT, () => {
  console.log(`Server listening on the PORT::${PORT}`);
});
