import mongoose from 'mongoose'
const Schema = mongoose.Schema 

const RestaurantSchema = new Schema({
  name: String
})

module.exports = mongoose.model('restaurant', RestaurantSchema)