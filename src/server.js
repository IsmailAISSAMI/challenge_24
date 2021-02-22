const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('./db/db-connection')
 
const fs = require('fs')
const path = require('path')
const multer = require('multer')
const Product = require('./models/product')


const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
 
// Set EJS as templating engine 
app.set('views', __dirname +'/views');
app.set('view engine', 'ejs');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '/uploads/'))
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
})
 
var upload = multer({ storage: storage })


app.get('/', (req, res) => {
    Product.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('productsPage', { items: items });
        }
    });
});

app.post('/', upload.single('image'), (req, res, next) => {
 
    var obj = {
        name: req.body.name,
        typeImg: req.body.typeImg,
        withProduct: req.body.withProduct,
        withHumain: req.body.withHumain,
        institutionnelle: req.body.institutionnelle,
        selectFormat: req.body.selectFormat,
        credits: req.body.credits,
        selectDroits: req.body.selectDroits,
        copyright: req.body.copyright,
        date: req.body.date,
        tags: req.body.tags,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    Product.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            item.save();
            res.redirect('/');
        }
    });
});

var port = process.env.PORT || '3000'
app.listen(port, err => {
    if (err)
        throw err
    console.log('Server listening on port', port)
})