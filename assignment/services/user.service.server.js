module.exports = function(app, models) {

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;

    passport.use(new LocalStrategy(localStrategy));

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.post("/api/user", createUser);
    app.get("/api/user", getUsers);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.post("/api/login", passport.authenticate('wam'), login);
    app.post("/api/logout", logout);

    var userModel = models.userModel;

    function createUser(req, res) {
        var newUser = req.body;

        if(!newUser.username) {
            res.status(400).json({message: "Username is required"});
            return;
        }

        if(!newUser.password) {
            res.status(400).json({message: "Password is required"});
            return;
        }

        userModel
            .createUser(newUser)
            .then(createSuccess, createError);

        function createSuccess(user) {
            res.json(user);
        }

        function createError(error) {
            res.status(400).json(error);
        }
    }

    function getUsers(req, res) {
        var username = req.query["username"];
        var password = req.query["password"];
        if(username && password) {
            userModel
                .findUserByCredentials(username, password)
                .then(foundUser, foundError);
        }
        else if(username) {
            userModel
                .findUserByUsername(username)
                .then(foundUser, foundError);
        }
        else {
            res.status(400).json({message: "Must provide username or username and password"});
        }

        function foundUser(user) {
            res.json(user);
        }

        function foundError(error) {
            res.status(400).json(error);
        }
    }

    function findUserByUsername(username, res) {
        userModel
            .findUserByUsername(username)
            .then(foundUser, foundError);

        function foundUser(user) {
            res.json(user);
        }

        function foundError(error) {
            res.status(400).json(error);
        }
    }

    function findUserByCredentials(username, password, res) {
        userModel
            .findUserByCredentials(username, password)
            .then(foundUser, foundError);

        function foundUser(user) {
            res.json(user);
        }

        function foundError(error) {
            res.status(400).json(error);
        }
    }

    function findUserById(req, res) {
        var id = req.params.userId;

        userModel
            .findUserById(id)
            .then(foundUser, foundError);

        function foundUser(user) {
            res.json(user);
        }

        function foundError(error) {
            res.status(400).json(error);
        }
    }

    function updateUser(req, res) {
        var id = req.params.userId;
        var newUser = req.body;

        userModel
            .updateUser(id, newUser)
            .then(updateSuccess, updateError);

        function updateSuccess(user) {
            res.json(user);
        }

        function updateError(error) {
            res.status(400).json(error);
        }
    }

    function deleteUser(req, res) {
        var id = req.params.userId;

        userModel
            .deleteUser(id)
            .then(deleteSuccess, deleteError);

        function deleteSuccess() {
            res.send(true);
        }

        function deleteError(error) {
            res.status(400).json(error);
        }
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials(username, password)
            .then(function(user) {
                if(user.username === username && user.password === password) {
                    return done(null, user);
                }
                else {
                    return done(null, false);
                }
            },
            function(error) {
                if(error) {
                    return done(error);
                }
            });
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(function(user) {
                    done(null, user);
                },
                function(error) {
                    done(error, null);
                })
    }
};