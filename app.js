const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const requests = require("requests");
const path = require('path');

const app = express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});


app.get("/book", (request, response) => {
  response.sendFile(__dirname + "/book.html");
})

app.post("/", (req, res) => {
  res.redirect("/book");

  const email = req.body.email;
  const name = req.body.fName;
  const phone = req.body.phoneNumber;

  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: name,
        PHONE: phone
      }
    }]
  };
  var jsonData = JSON.stringify(data);

  const url = "https://us14.api.mailchimp.com/3.0/lists/a676aa2851";

  const options = {
    method: "POST",
    auth: "gal2:03536f70cec489bb944a02e37118ddb4-us14"
  }
  const request = https.request(url, options, (response) => {

    response.on("data", (data) => {
      console.log(JSON.parse(data));
    })
  });

  request.write(jsonData);
  request.end();
});


app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/about.html")
})

app.get("/gallery", (req, res) => {
  res.sendFile(__dirname + "/gallery.html")
})

app.get("/success", (req, res) => {
  res.sendFile(__dirname + "/success.html")
})

app.get("/failure", (req, res) => {
  res.sendFile(__dirname + "/failure.html")
})

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});
