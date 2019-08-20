let router = require('express').Router();
let User = require('../../models/user');
let Payment = require('../../models/payment');

router.get('/view', function (req, res, next) {
    User.findById(req.session.userId, function (err, user) {
        if (user == null) return res.redirect("/admin/login");
        return res.redirect("/admin/payments/1");
    });
});

router.get('/view/:id', function (req, res, next) {
    User.findById(req.session.userId, function (err, user) {
        if (user == null) return res.redirect("/admin/login");
        let id = req.params.id;
        Payment.find({}, function (err, payments) {
            return res.render("./admin/pages/payment_view", {
                title: "View Payment",
                user: user,
                transaction_id: id
            });
        }).limit(20).skip(20 * (id - 1));
    });
});

router.get('/', function (req, res, next) {
    User.findById(req.session.userId, function (err, user) {
        if (user == null) return res.redirect("/admin/login");
        return res.redirect("/admin/payments/1");
    });
});

router.get('/:page', function (req, res, next) {
    User.findById(req.session.userId, function (err, user) {
        if (user == null) return res.redirect("/admin/login");
        let pager = req.params.page;
        Payment.find({}, function (err, payments) {
            return res.render("./admin/pages/payments", {
                title: "Payments",
                payments: payments,
                user: user,
                page: pager
            });
        }).limit(20).skip(20 * (pager - 1));
    });
});

module.exports = router;