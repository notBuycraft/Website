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

let Payment = require('../../models/payment');
router.get('/dashboard', function (req, res, next) {
    User.findById(req.session.userId, function (err, user) {
        if (user != null) {
            let today = new Date();
            let startDateMonth = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + 1;
            let endDateMonth = today.getFullYear() + '-' + (today.getMonth() + 2) + '-' + 1;
            let startDateYear = today.getFullYear() + '-' + 1 + '-' + 1;
            let endDateYear = (today.getFullYear() + 1) + '-' + 1 + '-' + 1;
            Payment.find({
                date: {
                    $gt: startDateMonth,
                    $lt: endDateMonth
                }
            }, function (err, payment_month) {
                Payment.find({
                    date: {
                        $gt: startDateYear,
                        $lt: endDateYear
                    }
                }, function (err, payment_year) {
                    let payment_count_month = payment_month.length;
                    let revenue_month = 0;
                    let payment_count_year = payment_year.length;
                    let revenue_year = 0;

                    payment_month.forEach(function (u) {
                        revenue_month += u.paid_price;
                    });

                    payment_year.forEach(function (u) {
                        revenue_year += u.paid_price;
                    });


                    return res.render("./admin/pages/dashboard", {
                        title: 'Dashboard',
                        user: user,
                        payment_count_month: payment_count_month,
                        payment_count_year: payment_count_year,
                        revenue_month: revenue_month,
                        revenue_year: revenue_year
                    });
                });
            });
        } else {
            return res.redirect("/admin/login");
        }
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