let router = require('express').Router();
let User = require('../../models/user');
let Category = require('../../models/category');
let Package = require('../../models/package');

router.get('/packages', function (req, res, next) {
    User.findById(req.session.userId, function (err, user) {
        if (user == null) return res.redirect("/admin/login");
        return res.redirect("/admin/packages/1");
    });
});

router.get('/package/new', function (req, res, next) {
    User.findById(req.session.userId, function (err, user) {
        if (user == null) return res.redirect("/admin/login");
        Category.find({}, function (err, categories) {
            return res.render("./admin/pages/package_new", {
                title: "New Package",
                user: user,
                categories: categories
            });
        });
    });
});

router.post('/package/new', function (req, res, next) {
    User.findById(req.session.userId, function (err, user) {
        if (user == null) return res.redirect("/admin/login");
        console.log(req.body.name + " " + parseFloat(req.body.price) + " " + req.body.description + " " + req.body.category);
        if (req.body.name && !isNaN(parseFloat(req.body.price)) && req.body.description && req.body.category) {

            let package_data = {
                name: req.body.name,
                category: req.body.category,
                price: req.body.price,
                description: req.body.description,
                enabled: true,
                commands: [{
                    command: "/test",
                    execution: "initial",
                    player_online: true
                }]
            };
            Package.create(package_data, function (error) {
                if (error) {
                    console.log(error);
                }
            });

            return res.redirect("/admin/packages");
        } else {
            Category.find({}, function (err, categories) {
                return res.render("./admin/pages/package_new", {
                    title: "New Package",
                    user: user,
                    categories: categories,
                    error: {
                        message: "All fields must be complete!"
                    }
                });
            });
        }
    });
});

router.get('/packages/:page', function (req, res, next) {
    User.findById(req.session.userId, function (err, user) {
        if (user == null) return res.redirect("/admin/login");
        let pager = req.params.page;
        Package.find({}, function (err, packages) {
            Category.find({}, function (err, categories) {
                return res.render("./admin/pages/packages", {
                    title: "Packages",
                    packages: packages,
                    categories: categories,
                    user: user,
                    page: pager
                });
            });
        }).limit(20).skip(20 * (pager - 1));
    });
});

router.get('/package/delete/:id', function (req, res, next) {
    User.findById(req.session.userId, function (err, user) {
        if (user == null) return res.redirect("/admin/login");
        let id = req.params.id;
        Package.findOne({_id: id}, function (err, package) {
            if (package == null) return res.redirect("/admin/packages");
            Package.deleteOne({_id: id}, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    Package.find({}, function (err, packages) {
                        Category.find({}, function (err, categories) {
                            return res.render("./admin/pages/packages", {
                                title: "Packages",
                                packages: packages,
                                categories: categories,
                                user: user,
                                page: 1,
                                success: {
                                    message: "Success! Deleted " + package.name + "."
                                },
                            });
                        });
                    }).limit(20);
                }
            });
        });
    });
});

router.get('/categories', function (req, res, next) {
    User.findById(req.session.userId, function (err, user) {
        if (user == null) return res.redirect("/admin/login");
        return res.redirect("/admin/categories/1");
    });
});

router.get('/category/new', function (req, res, next) {
    User.findById(req.session.userId, function (err, user) {
        if (user == null) return res.redirect("/admin/login");
        return res.render("./admin/pages/category_new", {
            title: "New Category",
            user: user,
        });
    });
});

router.get('/category/delete/:id', function (req, res, next) {
    User.findById(req.session.userId, function (err, user) {
        if (user == null) return res.redirect("/admin/login");
        let id = req.params.id;
        Category.findOne({_id: id}, function (err, category) {
            if (category == null) return res.redirect("/admin/categories");
            Package.find({category: id}, function (err, packages) {
                if (packages.length < 1) {
                    Category.deleteOne({_id: id}, function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            Category.find({}, function (err, categories) {
                                return res.render("./admin/pages/categories", {
                                    title: "Categories",
                                    categories: categories,
                                    success: {
                                        message: "Success! Deleted " + category.name + "."
                                    },
                                    user: user,
                                    page: 1
                                });
                            });
                        }
                    });
                } else {
                    Category.find({}, function (err, categories) {
                        return res.render("./admin/pages/categories", {
                            title: "Categories",
                            categories: categories,
                            error: {
                                message: "Error! There's packages associated with " + category.name + "."
                            },
                            user: user,
                            page: 1
                        });
                    });
                }
            });
        });
    });
});

router.get('/categories/:page', function (req, res, next) {
    User.findById(req.session.userId, function (err, user) {
        if (user == null) return res.redirect("/admin/login");
        let pager = req.params.page;
        Category.find({}, function (err, categories) {
            return res.render("./admin/pages/categories", {
                title: "Categories",
                categories: categories,
                user: user,
                page: pager
            });
        }).limit(20).skip(20 * (pager - 1));
    });
});

router.post('/category/new', function (req, res, next) {
    User.findById(req.session.userId, function (err, user) {
        if (user == null) return res.redirect("/admin/login");
        if (req.body.name && req.body.description) {
            let category_data = {
                name: req.body.name,
                description: req.body.description,
                enabled: true
            };
            Category.create(category_data, function (error) {
                if (error) {
                    console.log(error);
                }
            });
            return res.redirect("/admin/categories");
        } else {
                return res.render("./admin/pages/category_new", {
                    title: "New Category",
                    user: user,
                    error: {
                        message: "All fields must be complete!"
                    }
                });
        }
    });
});

module.exports = router;