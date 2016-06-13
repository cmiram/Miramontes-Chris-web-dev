module.exports = function(userModel) {

    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server")();
    var Website = mongoose.model("Website", WebsiteSchema);

    var api = {
        createWebsiteForUser: createWebsiteForUser,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite,
        pushPage: pushPage,
        pullPage: pullPage
    };
    return api;

    function createWebsiteForUser(userId, website) {
        website._user = userId;
        var result = Website
                    .create(website)
                    .then(addWebsiteToUser);
        return result;

        function addWebsiteToUser(website) {
            return userModel.pushWebsite(userId, website._id);
        }
    }

    function findAllWebsitesForUser(userId) {
        return Website.find({_user: userId});
    }

    function findWebsiteById(websiteId) {
        return Website.findOne({_id: websiteId});
    }

    function updateWebsite(websiteId, website) {
        return Website.findOneAndUpdate(
            {_id: websiteId},
            {$set: 
                {
                    name: website.name,
                    description: website.description
                }
            }
        );
    }

    function deleteWebsite(websiteId) {
        var result =  Website
                        .findOneAndRemove({_id: websiteId})
                        .then(removeWebsiteFromUser);
        return result;

        function removeWebsiteFromUser(website) {
            return userModel.pullWebsite(websiteId);
        }
    }

    function pushPage(websiteId, pageId) {
        return Website.update(
            {_id: websiteId},
            { $pushAll:
                {
                    pages: [pageId]
                }
            }
        );
    }

    function pullPage(websiteId, pageId) {
        return Website.update(
            {_id: websiteId},
            { $pullAll:
                {
                    pages:[pageId]
                }
            }
        );
    }
};