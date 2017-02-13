import mongoose from 'mongoose' 
import FoodTruck from './foodtruck'
const Schema = mongoose.Schema

const ReviewSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  text: String,
  foodtruck: {
    type: Schema.Types.ObjectId,
    ref: 'foodtruck',
    required: true
  }
})

module.exports = mongoose.model('review', ReviewSchema)