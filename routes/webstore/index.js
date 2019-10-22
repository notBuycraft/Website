let express = require('express');
let router = express.Router();
let Category = require('../../models/category');
let Package = require('../../models/package');
let Payment = require('../../models/payment');
const MinecraftAPI = require('minecraft-api');

router.get('/', function (req, res, next) {
    Category.find({}, function (err, categories) {
        res.render("./webstore/pages/index", {
            title: "Home",
            categories: categories
        });
    });
});

router.get('/login', function (req, res, next) {
    return res.redirect("/");
});

router.get('/login/:id', function (req, res, next) {
    let id = req.params.id;
    Category.findOne({_id: id}, function (err, category) {
        if (err) {
            return res.redirect("/");
        }
        if (req.session.mcUser != null) {
            return res.redirect("/category/" + id);
        }
        Category.find({}, function (err, categories) {
            return res.render("./webstore/pages/login", {
                title: "Login",
                redirect_id: id,
                categories: categories
            });
        });
    });
});


router.post('/login/:id', function (req, res) {
    let id = req.params.id;
    Category.findOne({_id: id}, function (err, category) {
        if (err) {
            return res.redirect("/");
        }
        /*if(req.session.mcUser != null){
            return res.redirect("/category/" + id);
        }*/
        MinecraftAPI.uuidForName(req.body.username)
            .then(function (uuid) {
                req.session.mcUser = req.body.username;
                req.session.uuid = uuid;
                return res.redirect("/category/" + id);
            })
            .catch(function (err) {
                Category.find({}, function (err, categories) {
                    return res.render("./webstore/pages/login", {
                        title: "Login",
                        redirect_id: id,
                        categories: categories,
                        error: {
                            message: "Invalid Minecraft username!"
                        }
                    });
                });
            });
    });
});

//todo post request for login :)

router.get('/category', function (req, res, next) {
    return res.redirect("/");
});

router.get('/category/:id', function (req, res, next) {
    let id = req.params.id;
    Category.findOne({_id: id}, function (err, category) {
        if (err) {
            return res.redirect("/");
        }
        if (req.session.mcUser == null) {
            return res.redirect("/login/" + id);
        }
        Category.find({}, function (err, categories) {
            Package.find({category: id}, function (err, packages) {
                Payment.find({}, function (err, payments) {
                    return res.render("./webstore/pages/category", {
                        title: category.name,
                        packages: packages,
                        categories: categories,
                        mcUser: req.session.mcUser,
                        uuid: req.session.uuid,
                        payments: payments,
                        category: category
                    });
                }).limit(5).sort({date: -1});
            });
        });
    });
});

router.get('/logout', function (req, res, next) {
    if (req.session) {
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
});


module.exports = router;