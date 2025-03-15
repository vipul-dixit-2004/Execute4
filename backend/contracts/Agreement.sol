// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0; 
contract Agreement {
    address admin;
    mapping(bytes32=>mapping(bytes32=>bool)) lender; // objectId => AadhaarNo => boolean  
    mapping(bytes32=>mapping(bytes32=>bool)) tenet; //  objectId => AadhaarNo => boolean  
    mapping(bytes32=>string) agreementData;
    constructor() {
        admin = msg.sender;
    }
     modifier isAdmin 
    { 
        require(admin == msg.sender); 
        _; 
    } 

    function setLender(string memory _lender,string memory _agreementID)public isAdmin{
        lender[keccak256(bytes(_lender))][keccak256(bytes(_agreementID))] = true;
    }
    function setTenet(string memory _tenet,string memory _agreementID)public isAdmin{
        tenet[keccak256(bytes(_tenet))][keccak256(bytes(_agreementID))] = true;
    }
    
    function checkLenderTenet(string memory _lender,string memory _tenet ,string memory _agreementID)public view returns (bool){
        return (lender[keccak256(bytes(_lender))][keccak256(bytes(_agreementID))] 
        &&
         tenet[keccak256(bytes(_tenet))][keccak256(bytes(_agreementID))]);
    }

    function makeAgreement(string memory _agreementID,string memory _lender,string memory _tenet,string memory _data) public isAdmin{
        require(checkLenderTenet(_lender,_tenet,_agreementID),"Not a valid agreement");
        agreementData[keccak256(bytes(_agreementID))] = _data;
    }
    
    function getAgreement(string memory _agreementID)public view returns (string memory){
        return agreementData[keccak256(bytes(_agreementID))];
    } 

}