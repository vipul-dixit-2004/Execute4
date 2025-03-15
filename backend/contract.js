const ethers = require('ethers');

const {API_URL,PRIVATE_KEY,CONTRACT_ADDRESS} = process.env
const {abi} = require('./artifacts/contracts/Agreement/');

const provider = new ethers.providers.JsonRpcProvider(API_URL);
const signer = new ethers.Wallet(PRIVATE_KEY,provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);


const getAgreement = async (agreementId) => {
    try {
        const agreement = await contract.getAgreement(agreementId);
        console.log(agreement);
        return agreement
    } catch (error) {
        console.error(error);
        return null;
    }
};
const makeAgreement = async (agreementId,lender,tenet,data) =>{
    try {
        const agreement = await contract.makeAgreement(agreementId,lender,tenet,data);
        console.log(agreement);
        return agreement
    } catch (error) {
        console.error(error);
        return null;
    }
};
const setLender = async (lender,agreementId)=>{
    try {
        const response = await contract.setLender(lender,agreementId);
        console.log(response);
        return response
    } catch (error) {
        console.error(error);
        return null;
    }    
}
const setTenet = async (tenet,agreementId)=>{
    try {
        const response = await contract.setTenet(tenet,agreementId);
        console.log(response);
        return response
        } catch (error) {
            console.error(error);
            return null;
         }
}

module.exports={
    getAgreement,
    makeAgreement,
    setLender,
    setTenet
}