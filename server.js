const apiKey = 'key-6c78ce95dea04f046f4c769916339991';
const domain = 'sandboxcf3f9d4db058485cba70faea54df6f32.mailgun.org';
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mail = require('mailgun-js')({apiKey: apiKey, domain: domain});
const validator = require('express-validator');
const compression = require('compression');
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
app.use(compression());
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
        to: 'office@darkshark.pro',
        subject: 'Новое сообщение с сайта Darkshark.pro',
        html: `
        <p>От: ${req.body.username}</p>
        <p>Сообщение: ${req.body.message}</p>
    `,
        attachment: req.file ? req.file.path : null
    };

    mail.messages().send(data, function (error, body) {
        if (!error) res.sendStatus(200);
        else res.sendStatus(400);
    });

});


app.listen(port, '0.0.0.0', function () {
    console.log(`server started on port ${port}`);
});


