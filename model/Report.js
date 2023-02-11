const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    reportName : String,
    reportType : String,
    reportFile: Buffer,
},{
    timestamps: true
});

module.exports = mongoose.model("Report", reportSchema);