var mongoose = require('mongoose')
 
var productSchema = new mongoose.Schema({
    name: String,
    desc: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
})

module.exports = new mongoose.model('Product', productSchema)
