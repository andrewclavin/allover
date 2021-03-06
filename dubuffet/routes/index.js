const router = require('express').Router();

router.use('/artwork', require('./artwork'))
router.use('/artists', require('./artists'))
router.use('/locations', require('./locations'))
router.use('/users', require('./users'))

router.use((req, res, next) => {
    res.status(404).send('Not found');
})
module.exports = router;
