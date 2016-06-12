module.exports = function(app, models) {

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    var websiteModel = models.websiteModel;
    
    function createWebsite(req, res) {
        var newWebsite = req.body;

        websiteModel
            .createWebsite(newWebsite)
            .then(createSuccess, createError);

        function createSuccess(website) {
            res.json(website);
        }

        function createError(error) {
            res.status(400).json(error);
        }
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;

        websiteModel
            .findAllWebsitesForUser(userId)
            .then(foundSuccess, foundError);

        function foundSuccess(websites) {
            res.json(websites);
        }

        function foundError(error) {
            res.status(400).json(error);
        }
    }

    function findWebsiteById(req, res) {
        var id = req.params.websiteId;

        websiteModel
            .findWebsiteById(id)
            .then(foundSuccess, foundError);

        function foundSuccess(websites) {
            res.json(websites);
        }

        function foundError(error) {
            res.status(400).json(error);
        }
    }

    function updateWebsite(req, res) {
        var id = req.params.websiteId;
        var newWebsite = req.body;

        websiteModel
            .updateWebsite(id, newWebsite)
            .then(updateSuccess, updateError);

        function updateSuccess(websites) {
            res.json(websites);
        }

        function updateError(error) {
            res.status(400).json(error);
        }
    }

    function deleteWebsite(req, res) {
        var id = req.params.websiteId;

        websiteModel
            .deleteWebsite(id)
            .then(deleteSuccess, deleteError);

        function deleteSuccess() {
            res.send(true);
        }

        function deleteError(error) {
            res.status(400).json(error);
        }
    }
};