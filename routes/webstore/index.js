let express = require('express');
let router = express.Router();

router.get('/', function (req, res, next) {
    res.render("./webstore/pages/index");
});

module.exports = router;