require("dotenv").config();
const express = require("express");
const User = require("./Controller/User");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { makeAgreement,setLender,setTenant,getAgreement,updateLandlordSignature,updateTenantSignature,createAgreement } = require("./Controller/User");
const bodyParser = require("body-parser");
const connectDB = require("./dbConnect");
const cors = require("cors");

const app = express();
connectDB();
const corsOptions = {
    origin: "*",
    credentials: true,
  };
  
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());


app.get("/",(req,res)=>{
    res.send("Welcome to the server");
})
app.post("/makeAgreement",makeAgreement);
app.post("/setTenant",setTenant);
app.post("/setLender",setLender);
app.get("/getAgreement",getAgreement);
app.patch('/:id/landlord-signature', updateLandlordSignature);
app.patch('/:id/tenant-signature', updateTenantSignature);
app.post('/createAgreement',createAgreement);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});