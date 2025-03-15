const express = require("express");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { makeAgreement,setLender,setTenet,getAgreement } = require("./Controller/User");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

app.post("/makeAgreement",makeAgreement);
app.post("/setTenet",setTenet);
app.post("/setLender",setLender);
app.get("/getAgreement",getAgreement);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});