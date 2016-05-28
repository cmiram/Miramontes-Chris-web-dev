(function() {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);
    
    function WebsiteService() {
        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
            { "_id": "678", "name": "Checkers",    "developerId": "123" },
            { "_id": "789", "name": "Chess",       "developerId": "234" }
        ];
        var api = {
            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };
        return api;

        function createWebsite(userId, website) {
            var newWebsite = {
                _id: Date.prototype.getDate().valueOf(),
                name: website,
                developer: userId
            };
            websites.push(newWebsite);
        }

        function findWebsitesByUser(userId) {
            var usersWebsites = [];
            for(var i in websites) {
                if(websites[i].developerId === userId) {
                    usersWebsites.push(websites[i]);
                }
            }
            return usersWebsites;
        }

        function findWebsiteById(websiteId) {
            for(var i in websites) {
                if(websites[i]._id === websiteId) {
                    return websites[i];
                }
            }
            return null;
        }

        function updateWebsite(websiteId, website){
            for(var i in websites) {
                if(websites[i]._id === websiteId) {
                    websites[i].name = website.name;
                    return true;
                }
            }
            return false;
        }

        function deleteWebsite(websiteId) {
            for (var i in websites) {
                if (websites[i]._id === websiteId) {
                    websites.remove(i);
                    return true;
                }
            }
            return false;
        }
    }
})();