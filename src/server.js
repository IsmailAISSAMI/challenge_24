const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('./db/db-connection')
 
const fs = require('fs')
const path = require('path')
const multer = require('multer')
const Product = require('./models/product')


const app = express()
var port = process.env.PORT || '3000'

app.use(express.static(__dirname + '/public'));
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
    res.render('index');
});

app.get('/getProducts', (req, res) => {
    Product.find({}, (err, items) => {
        if (err) {
            console.log(err);
            //res.status(500).send('An error occurred', err);
            res.status(status).send(body)
        }
        else {
            res.render('getProducts', { items });
        }
    });
});

app.get('/addProduct', (req, res) => {
    Product.find({}, (err, items) => {
        if (err) {
            console.log(err);
            // res.status(500).send('An error occurred', err);
            res.status(status).send(body)
        }
        else {
            res.render('addProducts', { items });
        }
    });
});

app.post('/searchProduct', (req, res) => {
    const query = req.body.search;

    Product.find({
        $or: [
          { 'name': query },
          { 'tags': { $regex: query } }
        ]
      }, (err, items) => {
        if (err) {
            console.log(err);
            //res.status(500).send('An error occurred', err);
            res.status(status).send(body)
        }
        else {
            res.render('searchProducts', { items });
        }
    });
});

app.post('/addProduct', upload.single('image'), (req, res, next) => {
 
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

    const product = new Product(obj)
    product.save().then((result)=>{
        console.log("A new product is added to database!\n", result)
        res.redirect('/getProducts')
    }).catch((e)=>{
        console.log("ERROR: ", e)
    })
});

app.listen(port, err => {
    if (err)
        throw err
    console.log('Server listening on port', port)
})