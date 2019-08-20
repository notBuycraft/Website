let router = require('express').Router();
let User = require('../../models/user');

router.get('/', function (req, res, next) {
    User.findById(req.session.userId, function (err, user) {
        if (user != null) return res.redirect("/admin/dashboard");
        return res.render("./admin/pages/login", {title: 'Login'});
    });
});

router.post('/', function (req, res, next) {
    if (req.body.email && req.body.password) {
        User.authenticate(req.body.email, req.body.password, function (error, user) {
            if (error || !user) {
                User.findById(req.session.userId)
                    .exec(function (error, user) {
                        if (error) {
                            return next(error);
                        } else {
                            return res.render("./admin/pages/login", {
                                title: "Login",
                                user: user,
                                error: {
                                    type: "login",
                                    message: "Incorrect username or password!"
                                }
                            });
                        }
                    });
            } else {
                req.session.userId = user._id;
                return res.redirect('/admin/dashboard');
            }
        });
    } else {
        User.findById(req.session.userId)
            .exec(function (error, user) {
                if (error) {
                    return next(error);
                } else {
                    return res.render("./admin/pages/login", {
                        title: "Login",
                        user: user,
                        error: {
                            type: "login",
                            message: "All fields must be complete!"
                        }
                    });
                }
            });
    }
});


module.exports = router;