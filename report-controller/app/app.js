const express = require('express')
const reportServiceRoute = require('./routes/report-service');

const reportPath = process.env.REPORT_PATH || '/Users/poweres/code_playground/test-nignx/reports'

const app = express()
const PORT = 3000
const HOST = '0.0.0.0'


app.use('/report-service', reportServiceRoute)

// Custom error handling middleware 
app.use((err, req, res, next) => {
    console.error(`Error Middleware Log: ${err}`);
    res.status(500).json(
        { message: 'Something went wrong!' });
});

app.listen(PORT, HOST)
console.log(`Our app running on http://${HOST}:${PORT} Sending Report to : ${reportPath}`)

