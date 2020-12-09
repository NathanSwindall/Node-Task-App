// Crud create read update delete


// connect to the database
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const database = 'task-manager'

MongoClient.connect(connectionURL,{ useNewUrlParser: true,  useUnifiedTopology: true}, (error, client) => {
    if(error){
        return console.log(error)
    }

    console.log('Connected correctly!')
})


