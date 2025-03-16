const {Agreement} = require("../Schema/AgreementSchema");
const { encryptData } = require("../Utils/util");
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
const createAgreement = async (req, res) => {
    try {
      const newAgreement = new Agreement(req.body);
      await newAgreement.save();
      
      return res.status(201).json({
        success: true,
        message: 'Agreement created successfully',
        data: newAgreement
      });
    } catch (error) {
      console.error('Error creating agreement:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to create agreement',
        error: error.message
      });
    }
  };

const updateLandlordSignature = async (req, res) => {
    try {
      const agreement = await Agreement.findByIdAndUpdate(
        req.params.id,
        { landlordSignature: true, updatedAt: Date.now() },
        { new: true }
      );
      
      if (!agreement) {
        return res.status(404).json({
          success: false,
          message: 'Agreement not found'
        });
      }
      
      // Set lender (landlord) on blockchain
      const response = await Contract.setLender(agreement.landlordAadhaar, agreement._id.toString());
      console.log(response);
      
      return res.status(200).json({
        success: true,
        message: 'Landlord signature updated successfully',
        data: agreement
      });
    } catch (error) {
      console.error('Error updating landlord signature:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to update landlord signature',
        error: error.message
      });
    }
  };
  
  // Update tenant signature and set tenant on blockchain
const updateTenantSignature = async (req, res) => {
    try {
      const agreement = await Agreement.findByIdAndUpdate(
        req.params.id,
        { tenantSignature: true, updatedAt: Date.now() },
        { new: true }
      );
      
      if (!agreement) {
        return res.status(404).json({
          success: false,
          message: 'Agreement not found'
        });
      }
      
      // Set tenant on blockchain
      const response = await Contract.setTenant(agreement.tenantAadhaar, agreement._id.toString());
      console.log(response);
      
      return res.status(200).json({
        success: true,
        message: 'Tenant signature updated successfully',
        data: agreement
      });
    } catch (error) {
      console.error('Error updating tenant signature:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to update tenant signature',
        error: error.message
      });
    }
  };
  
module.exports={
    makeAgreement,
    getAgreement,
    setLender,
    setTenant,

    createAgreement,
    updateTenantSignature,
    updateLandlordSignature

  }