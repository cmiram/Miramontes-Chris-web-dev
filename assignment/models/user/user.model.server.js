module.exports = function() {
    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var User = mongoose.model("User", UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser,
        pushWebsite: pushWebsite,
        pullWebsite: pullWebsite
        
    };
    return api;

    function createUser(user) {
        return User.createUser(user);
    }

    function findUserById(userId) {
        return User.findUserById(userId);
    }

    function findUserByCredentials(username, password) {
        return User.findOne({username: username, password: password});
    }

    function findUserByUsername(username) {
        return User.findOne({username: username});
    }

    function updateUser(userId, newUser) {
        return User.update(
            {_id: userId},
            { $set:
                {
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    email: newUser.email,
                    phone: newUser.phone,
                    websites: newUser.websites
                }
            }
        );
    }

    function deleteUser(userId) {
        return User.remove({_id: userId});
    }

    function pushWebsite(userId, websiteId) {
        return User.update(
            {_id: userId},
            { $pushAll:
                {
                    websites: [websiteId]
                }
            }
        );
    }
    
    function pullWebsite(userId, websiteId) {
        return User.update(
            {_id: userId},
            {$pullAll:
                {
                    websites: [websiteId]
                }
            }
        )
    }
};