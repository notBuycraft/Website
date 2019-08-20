let express = require('express');
let router = express.Router();
let User = require('../../models/user');

router.use('/login', require('./login'));
router.use('/payments', require('./payments'));
router.use('/webstore', require('./webstore'));

router.get('/', function (req, res, next) {
    User.findById(req.session.userId, function (err, user) {
        if (user != null) return res.redirect("/admin/dashboard");
        return res.redirect("/admin/login");
    });
});

router.get('/dashboard', function (req, res, next) {
    User.findById(req.session.userId, function (err, user) {
        if (user != null) return res.render("./admin/pages/dashboard", {title: 'Dashboard'});
        return res.redirect("/admin/login");
    });
});

router.get('/logout', function (req, res, next) {
    if (req.session) {
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/admin/login');
            }
        });
    }
});

module.exports = router;