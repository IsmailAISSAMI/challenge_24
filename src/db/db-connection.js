const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://admin:db7aresQL17dpGoW@cluster0.86pvn.mongodb.net/pomona?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})