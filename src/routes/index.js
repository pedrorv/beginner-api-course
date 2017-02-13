import express from 'express'
import config from '../config'
import middleware from '../middleware'
import initializeDb from '../db'
import foodtruck from '../controllers/foodtruck'
import account from '../controllers/account'

let router = express()

initializeDb(db => {

  router.use(middleware({ config, db }))

  router.use('/foodtruck', foodtruck({ config, db }))
  router.use('/account', account({ config, db }))

})

export default router