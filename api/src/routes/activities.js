const {Router} = require('express')
const {newAct} = require('../controllers/activities.js')


const router = Router()


router.post('/', newAct )


module.exports = router