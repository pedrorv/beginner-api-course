import mongoose from 'mongoose'
import { Router } from 'express'
import FoodTruck from '../model/foodtruck'
import Review from '../model/review'

export default ({ config, db }) => {
  let api = Router()

  api.post('/add', (req, res) => {
    let newFoodTruck = new FoodTruck()
    newFoodTruck.name = req.body.name
    newFoodTruck.foodtype = req.body.foodtype
    newFoodTruck.avgcost = req.body.avgcost
    newFoodTruck.geometry.coordinates = req.body.geometry.coordinates

    newFoodTruck.save(err => {
      if (err) {
        res.send(err)
      }

      res.json({ message: 'Food truck was saved successfully.' })
    })
  })

  api.get('/', (req, res) => {
    FoodTruck
      .find({}, (err, foodtrucks) => {
        if (err) {
          res.send(err)
        }

        res.json(foodtrucks)
      })
  })

  api.get('/:id', (req, res) => {
    FoodTruck
      .findById(req.params.id, (err, foodtruck) => {
        if (err) {
          res.send(err)
        }

        res.json(foodtruck)
      })
  })

  api.put('/:id', (req, res) => {
    FoodTruck
      .findById(req.params.id, (err, foodtruck) => {
        if (err) {
          res.send(err)
        }

        foodtruck.name = req.body.name || foodtruck.name
        foodtruck.foodtype = req.body.foodtype || foodtruck.foodtype
        foodtruck.avgcost = req.body.avgcost || foodtruck.avgcost
        foodtruck.geometry.coordinates = req.body.geometry.coordinates || foodtruck.geometry.coordinates

        foodtruck.save(err => {
          if (err) {
            res.send(err)
          }

          res.json({ message: 'Food truck was successfully updated.' })
        })
      })
  })

  api.delete('/:id', (req, res) => {
    FoodTruck
      .remove({ _id: req.params.id }, (err, foodtruck) => {
        if (err) {
          res.send(err)
        }

        res.json({ message: 'Food truck was successfully removed.' })
      })
  })

  api.post('/reviews/add/:id', (req, res) => {
    FoodTruck
      .findById(req.params.id, (err, foodtruck) => {
        if (err) {
          res.send(err)
        }
        let newReview = new Review()

        newReview.title = req.body.title
        newReview.text = req.body.text
        newReview.foodtruck = foodtruck._id
        newReview.save((err, review) => {
          if (err) {
            res.send(err)
          }

          foodtruck.reviews.push(newReview)
          foodtruck.save(err => {
            if (err) {
              res.send(err)
            }

            res.json({ message: 'Food truck review was successfully saved.' })
          })
        })
      })
  })

  api.get('/reviews/:id', (req, res) => {
    Review
      .find({ foodtruck: req.params.id }, (err, reviews) => {
        if (err) {
          res.send(err)
        }

        res.json(reviews)
      })
  })

  api.get('/foodtype/:foodtype', (req, res) => {
    FoodTruck
      .find({ foodtype: req.params.foodtype }, (err, foodtrucks) => {
        if (err) {
          res.send(err)
        }

        res.json(foodtrucks)
      })
  })

  return api
}
