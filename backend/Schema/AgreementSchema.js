const mongoose = require('mongoose');

const AgreementSchema = new mongoose.Schema({
  agreementDate: {
    type: String,
    required: true
  },
  agreementCity: {
    type: String,
    required: true
  },
  agreementState: {
    type: String,
    required: true
  },
  propertyAddress: {
    type: String,
    required: true
  },
  propertyType: {
    type: String,
    required: true
  },
  tenancyStartDate: {
    type: String,
    required: true
  },
  tenancyEndDate: {
    type: String,
    required: true
  },
  tenancyPeriod: {
    type: Number,
    required: true
  },
  monthlyRent: {
    type: Number,
    required: true
  },
  monthlyRentDay: {
    type: Number,
    required: true
  },
  securityDeposit: {
    type: Number,
    required: true
  },
  landlordName: {
    type: String,
    required: true
  },
  landlordAddress: {
    type: String,
    required: true
  },
  landlordPhone: {
    type: String,
    required: true
  },
  landlordEmail: {
    type: String,
    required: true
  },
  landlordAadhaar: {
    type: String,
    required: true
  },
  tenantName: {
    type: String,
    required: true
  },
  tenantAddress: {
    type: String,
    required: true
  },
  tenantPhone: {
    type: String,
    required: true
  },
  tenantEmail: {
    type: String,
    required: true
  },
  furnishedProperty: {
    type: Boolean,
    default: false
  },
  furnishingDetails: {
    type: String
  },
  maintenanceResponsibility: {
    type: String,
    required: true
  },
  noticePeriod: {
    type: Number,
    required: true
  },
  landlordSignature: {
    type: Boolean,
    default: false
  },
  tenantSignature: {
    type: Boolean,
    default: false
  },
  witnessName: {
    type: String
  },
  witnessSignature: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});
const Agreement = mongoose.model('Agreement', AgreementSchema);

module.exports= {
  Agreement
}