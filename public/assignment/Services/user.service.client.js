(function() {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        var api = {
            createUser: createUser,
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findUserById: findUserById,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
        return api;

        function createUser(user) {
            if(findUserByUsernameAndPassword(user.username, user.password) == null) {
                var newUser = {
                    _id: Date.prototype.getDate().getValue(),
                    username: user.username,
                    password: user.password,
                    firstname: null,
                    lastname: null
                }
                users.push(newUser);
                return true;
            }
            return false;
        }
        function findUserByUsernameAndPassword(username, password) {
            for(var i in users) {
                if (users[i].username === username && users[i].password === password) {
                    return users[i];
                }
            }
            return null;
        }
        function findUserById(id) {
            for(var i in users) {
                if (users[i]._id === id) {
                    return users[i];
                }
            }
            return null;
        }
        function updateUser(id, user) {
            for(var i in users) {
                if(users[i]._id === id) {
                    users[i].firstName = newUser.firstName;
                    users[i].lastName = newUser.lastName;
                    return true;
                }
            }
            return false;
        }
        function deleteUser(id) {
            for(var i in users) {
                if(users[i]._id === id) {
                    users.remove(i);
                    return true;
                }
            }
            return false;
        }
    }
})();