let express = require('express');
let router = express.Router();

router.use('/admin', require('./admin/index'));
router.use('/api', require('./api'));
router.use('/', require('./webstore/index'));

module.exports = router;