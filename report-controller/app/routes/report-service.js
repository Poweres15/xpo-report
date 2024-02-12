const express = require('express');
const router = express.Router();
const { getMulterUpload } = require('../utils/mutler');
const util = require('util');
const exec = util.promisify(require('child_process').exec);


const reportPath = process.env.REPORT_PATH || '/Users/poweres/code_playground/test-nignx/reports'

const upload = getMulterUpload(reportPath)


router.route('/')
    .get((req, res) => {
        res.send('Report Service is Running')
    })


router.post('/upload', upload.single('file'), async (req, res, next) => {
    try {
        // Extract Folder
        const { destination, path } = req.file
        const { stdout, stderr } = await exec(`unzip -o  ${path} -d ${destination}`);
        console.log('Unzip stdout:', stdout);
        console.log('Unzip stderr:', stderr);
        await exec(`rm ${path}`);
        console.log('rm zip file stdout:', stdout);
        console.log('rm zip file stderr:', stderr);
        return res.status(200).json({ message: 'File uploaded successfully!' });
    } catch (error) {
        next(error);
    }
})




module.exports = router;