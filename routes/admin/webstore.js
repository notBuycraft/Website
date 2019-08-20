let router = require('express').Router();
let User = require('../../models/user');
let Category = require('../../models/category');
let Package = require('../../models/package');

router.get('/packages', function (req, res, next) {
    User.findById(req.session.userId, function (err, user) {
        if (user == null) return res.redirect("/admin/login");
        Package.find({}, function (err, packages) {
            return res.render("./admin/pages/packages", {
                title: "Packages",
                packages: packages
            });
        });
    });
});

router.get('/categories', function (req, res, next) {
    User.findById(req.session.userId, function (err, user) {
        if (user == null) return res.redirect("/admin/login");
        Category.find({}, function (err, categories) {
            return res.render("./admin/pages/categories", {
                title: "Categories",
                packages: categories
            });
        });
    });
});

module.exports = router;