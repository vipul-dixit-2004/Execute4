const { default: mongoose } = require("mongoose");

const AgreementSchema = new mongoose.Schema({
});
const Agreements = mongoose.model("Agreement", AgreementSchema);
module.exports = Agreements;