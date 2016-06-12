module.exports = function() {
    var mongoose = require("mongoose");

    var UserSchema = mongoose.schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        websites: [{type: Schema.Types.WebsiteSchema, ref: 'Website'}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "assignment.user"});

    return UserSchema;
}