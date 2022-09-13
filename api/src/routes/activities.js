const {Router} = require('express')
const {newAct, getAllActivities, } = require('../controllers/activities.js')


const router = Router()


router.post('/', newAct )
router.get('/', getAllActivities)


module.exports = router;