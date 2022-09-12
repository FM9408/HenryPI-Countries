const { Router } = require('express');
const requireCountries = require('./countries')
const newActivity = require('./activities')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/countries', requireCountries )
router.use('/activities', newActivity)


module.exports = router;
