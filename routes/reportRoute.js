const router = require('express').Router();

const Report = require('../model/Report');

router.post('/report/create', (req, res) => {
    try {
        

        const report = new Report({
            reportName : req.body.reportName,
            reportType : req.body.reportType
        });
        const saveReport = report.save();
        if(saveReport){
            res.status(201).json(report);
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;