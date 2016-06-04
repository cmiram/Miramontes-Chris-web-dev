module.exports = function(app) {
    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    app.post("/api/user", createUser);
    app.get("/api/user?username=username", findUserByUsername);
    app.get("/api/user?username=username&password=password", findUserByCredentials);
    app.get("/api/user/:userId", findUserById);
    app.put("api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    function createUser(req, res) {
        var newUser = req.body;

        for(var i in users) {
            if(users[i].username === newUser.username) {
                res.status(400).send("Username "  + newUser.username + " is already being used");
                return;
            }
        }

        newUser._id = (new Date()).getTime().toString();
        users.push(newUser);
        res.json(newUser);
    }

    function findUserByUsername(username, res) {
        for(var u in users) {
            if(users[u].username === username) {
                res.send(users[u]);
                return;
            }
        }
        res.send(403);
    }

    function findUserByCredentials(username, password, res) {
        for(var u in users) {
            if(users[u].username === username && users[u].password === password) {
                res.send(users[u]);
                return;
            }
        }
        res.send({});
    }

    function findUserById(req, res) {
        var id = req.params.userId;

        for(var u in users) {
            if(users[u]._id === id) {
                res.send(users[u]);
                return;
            }
        }
        res.send({});
    }

    function updateUser(req, res) {
        var id = req.params.userId;
        var newUser = req.body;

        for(var u in users) {
            if(users[u]._id === id) {
                users[u].firstName = newUser.firstname;
                users[u].lastName = newUser.lastName;
                users[u].email = newUser.email;
                res.send(200);
                return;
            }
        }
        res.status(400).send("User with ID: " + id + " not found");
    }

    function deleteUser(req, res) {
        var id = req.params.userId;

        for(var u in users) {
            if(users[u]._id === id) {
                users.splice(u, 1);
                res.send(200);
                return
            }
        }
        res.status(400).send("User with ID: " + id + " not found");
    }
};