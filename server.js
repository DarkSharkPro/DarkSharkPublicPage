const apiKey = 'key-19d46b64b091786d89a81bf09d246948';
const domain = 'sandbox5e4f176b14d54238b8b68fd91f174a65.mailgun.org';
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mail = require('mailgun-js')({apiKey: apiKey, domain: domain});
const validator = require('express-validator');
const path = require('path');

const port = process.env.PORT || 3000

const app = express();

app.use(cors());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
});

app.use(multer({ storage: storage}).single('uploads'));
app.use(validator());
app.use(express.static('dist'));

app.get('/',function(req,res) {
    res.sendFile(path.join(__dirname, './dist/index.html'));
});

app.post('/mail', function(req, res) {
    req.checkBody('email','Please enter correct email').isEmail();
    req.checkBody('username', 'Please enter your name').notEmpty();
    req.checkBody('message', 'This field is required').notEmpty();

    const errors = req.validationErrors();
    if (errors) {
        res.send({ errors });
        return;
    }

    const data = {
        from: req.body.email,
        to: 'test@darkshark.pro',
        subject: 'Новое сообщение с сайта Darkshark.pro',
        html: `
        <p>От кого: ${req.body.username}</p>
        <p>Сообщение: ${req.body.message}</p>
    `,
        attachment: req.file ? req.file.path : null
    };

    mail.messages().send(data, function (error, body) {
        console.log(body);
        if (!error) res.sendStatus(200);
        else res.sendStatus(400);
    });

});

app.listen(port, '0.0.0.0', function () {
    console.log(`server started on port ${port}`);
});


