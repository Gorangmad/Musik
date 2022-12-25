const express = require('express')
const app = express()
const nodemailer = require ('nodemailer')
require('dotenv').config()

const PORT = process.env.PORT || 5000;

app.use(express.static('public'));
app.use(express.json())


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/html/index.html')
})

app.get('/juice', (req, res) => {
    res.sendFile(__dirname + '/public/html/2.html')
})
app.get('/travis', (req, res) => {
    res.sendFile(__dirname + '/public/html/3.html')
})
app.get('/samra', (req, res) => {
    res.sendFile(__dirname + '/public/html/4.html')
})


app.post('/', (req, res) => {
    console.log(req.body)

    const transporter = nodemailer.createTransport({
 
        service: 'gmail',
        auth: {
            user: 'wedogbr@gmail.com',
            pass: process.env.CODE,

        }
    })

    const mailOptions = {
        from: req.body.email,
        to: 'wedogbr@gmail.com',
        subject: req.body.topic,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.log(error);
            res.send('error');
        }else{
            console.log('Email sent')
            res.send('success')
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`)
})