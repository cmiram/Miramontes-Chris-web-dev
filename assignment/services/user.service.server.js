module.exports = function(app, models) {

    app.post("/api/user", createUser);
    app.get("/api/user", getUsers);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

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
};