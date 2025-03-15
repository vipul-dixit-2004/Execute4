const Complains = require("../Schema/complains");
const { encryptData } = require("../Utils/utils");
const Contract = require('../contract')
async function makeAgreement(req, res) {
    try {
      const { _id,tenantName,landlordAadhaar,tenantAadhaar,agreementData } =
        req.body;
      const encryptedAgreementData = encryptData(agreementData);
      const response = await Contract.makeAgreement(_id,landlordAadhaar,tenantAadhaar,encryptedAgreementData);

      console.log(response);
      res
        .status(200)
        .json({ status:true });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: false, message: "Internal Server Error" });
    }
}
async function getAgreement(req, res) {
    try{
        const { _id } = req.params;
        const response = await Contract.getAgreement(_id);
        console.log(response);
        res
        .status(200)
        .json({ status:true, data: response });
    }catch(error){
        console.log(error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
}
async function setLender(req, res) {
    try {
        const { _id, landlordAadhaar } = req.body;
        const response = await Contract.setLender(landlordAadhaar,_id);
        console.log(response);
        res.status(200).json({ status:true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
    
}
async function setTenant(req, res) {
    try {
        const { _id, tenantAadhaar } = req.body;
        const response = await Contract.setTenant(tenantAadhaar,_id);
        console.log(response);
        res.status(200).json({ status:true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
}


module.exports={
    makeAgreement,
    getAgreement,
    setLender,
    setTenant
  }