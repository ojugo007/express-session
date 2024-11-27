const mongoose =  require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose")
const schema = mongoose.Schema

const UserModel = new schema({
    username :{
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
})
// const UserModel = new schema({
//     username :String,
//     password: String
// })

UserModel.plugin(passportLocalMongoose)

module.exports = mongoose.model("user", UserModel)