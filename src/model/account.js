import mongoose from 'mongoose' 
const Schema = mongoose.Schema
import passportLocalMongoose from 'passport-local-mongoose'

const AccountSchema = new Schema({
  email: String,
  password: String
})

AccountSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model('account', AccountSchema)