module.exports = function(app) {

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" },
        { "_id": "789", "name": "Chess",       "developerId": "234" }
    ];

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/user/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);
    
    function createWebsite(req, res) {
        var newWebsite = req.body;

        newWebsite._id = (new Date()).getTime().toString();
        newWebsite.developerId = req.params.userId;
        websites.push(newWebsite);
        res.json(newWebsite);
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        var sites = [];

        for(var i in websites) {
            if(websites[i].developerId === userId) {
                sites.push(websites[i]);
            }
        }
        res.json(sites);
    }

    function findWebsiteById(req, res) {
        var id = req.params.websiteId;

        for(var i in websites) {
            if(websites[i]._id === id) {
                res.send(websites[i]);
                return;
            }
        }
        res.status(403);
    }

    function updateWebsite(req, res) {
        var id = req.params.websiteId;
        var newWebsite = req.body;

        for(var i in websites) {
            if(websites[i]._id === id) {
                websites[i].name = newWebsite.name;
                websites[i].description = newWebsite.description;
                res.send(200);
                return;
            }
        }
        res.status(403);
    }

    function deleteWebsite(req, res) {
        var id = req.params.websiteId;

        for(var i in websites) {
            if(websites[i]._id === id) {
                websites.splice(i, 1);
                res.send(200);
                return;
            }
        }
        res.send(403);
    }
};