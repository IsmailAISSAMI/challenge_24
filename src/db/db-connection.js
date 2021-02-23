const mongoose = require('mongoose')
// process.env.MONGODB_URL = 'mongodb+srv://admin:db7aresQL17dpGoW@cluster0.86pvn.mongodb.net/pomona?retryWrites=true&w=majority'
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})