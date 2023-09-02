const express = require("express");
require("dotenv").config();

const PORT = process.env.PORT || 3001;
const app = express();

const { generateResponse } = require("./openai");

app.get("/api", (req, res) => {
  generateResponse()
    .then(function (response) {
      res.write(response.content);
      res.end();
    })
    .catch(function (error) {
      console.log("Failed!", error);
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
