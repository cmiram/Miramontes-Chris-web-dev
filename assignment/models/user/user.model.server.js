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
        pullWebsite: pullWebsite,
        findUserByFacebookId: findUserByFacebookId
    };
    return api;

    function createUser(user) {
        return User.create(user);
    }

    function findUserById(userId) {
        return User.findOne({_id: userId});
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
    
    function findUserByFacebookId(facebookId) {
        return User.findOne({'facebook.id' : facebookId});
    }
};