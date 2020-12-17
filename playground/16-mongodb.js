require('../src/db/mongoose')
const mongoose = require('mongoose')

const airplaneSchema = new mongoose.Schema({
    airplane: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    metal: {
        type: String,
        default: "Aluminum"
    }
})

airplaneSchema.pre('save', async function(next){
    const airplane = this
    airplane.metal = airplane.metal.concat(" This part was concated on")
    next() // call for boiler plate code
} )

const AirPlane = mongoose.model('AirPlane', airplaneSchema)

const myAirPlane = new AirPlane({
    airplane: "7-47"
})



const saveToDatabase = async () => {
    console.log(myAirPlane)
    await myAirPlane.save()
    console.log("hello")
}


// saveToDatabase()

// Let's update this airplanes metal
const findAndUpdateMetal = async () => {
    const airplane = await AirPlane.findById("5fdb69b6a4de832d1015983c")
    airplane.metal = "My brass ffdknuckles"
    console.log(airplane)
    await airplane.save()
}


findAndUpdateMetal()