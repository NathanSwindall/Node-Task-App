// Crud create read update delete


const {MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID()

MongoClient.connect(connectionURL,{ useNewUrlParser: true,  useUnifiedTopology: true}, (error, client) => {
    if(error){
        return console.log(error) // make sure to return so the rest of the code is run
    }

    const db = client.db(databaseName)
    // db.collection('users').insertOne({
    //     name: 'Nathan',
    //     age: 27
    // } ,(error, result) => {
    //     if( error) {
    //         return console.log("Unable to insert user")
    //     }

    //     console.log(result.ops)
    // } )

    const update = db.collection('tasks').updateMany(
        { finished: false},
        { 
            $set: {
                finished: true
            }
        }
    )

    update.then(() => {
        console.log("updated")
    }).catch(() => {
        console.log("not updated")
    })
 
})







// insert documents
// const inserted = db.collection('tasks').insertMany([
//     { 
//       task: "Finish some node application",
//       finished: false
//     },
//     {
//       task: "Become really focused",
//       finished:  false
//     },
//     {
//       task: "Do your best",
//       finished: false
//     }
// ])

// inserted.then(() => {
//     console.log("Things are inserted")
// }).catch(() => {
//     console.log("Things are not inserted")
// })


