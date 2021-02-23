var mongoose = require('mongoose')
 
var productSchema = new mongoose.Schema({
    name: {
        type: String
    },
    isProduct: {
        type: Boolean,
        default: true
    },
    isHumain: {
        type: Boolean,
        default: false
    },
    isInstitu:{
        type: Boolean,
        default: false
    },
    format:{
        type: String,
    },
    credits: {
        type: String,
    },
    droits: {
        type: Boolean,
        default: false
    },
    copyright: {
        type: String
    },
    date :{
        type: String
    },
    tags :{
        type: String
    },
    img:
    {
        data: Buffer,
        contentType: String
    }
})

const product = new mongoose.model('Product', productSchema)

module.exports = product
