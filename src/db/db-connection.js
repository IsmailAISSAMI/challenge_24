const mongoose = require('mongoose')

// const pass = 'db7aresQL17dpGoW'

mongoose.connect('mongodb+srv://admin:db7aresQL17dpGoW@cluster0.86pvn.mongodb.net/pomona?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})