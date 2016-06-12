module.exports = function(app, models) {

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    var pageModel = models.pageModel;
    
    function createPage(req, res) {
        var newPage = req.body;
        var websiteId = req.params.websiteId
        
        pageModel
            .createPage(websiteId, newPage)
            .then(createSuccess, createError);

        function createSuccess(page) {
            res.json(page);
        }

        function createError(error) {
            res.status(400).json(error);
        }
    }

    function findAllPagesForWebsite(req, res) {
        var id = req.params.websiteId;

        pageModel
            .findAllPagesForWebsite(id)
            .then(foundSuccess, foundError);

        function foundSuccess(page) {
            res.json(page);
        }

        function foundError(error) {
            res.status(400).json(error);
        }
    }

    function findPageById(req, res) {
        var id = req.params.pageId;

        pageModel
            .findPageById(id)
            .then(foundSuccess, foundError);

        function foundSuccess(page) {
            res.json(page);
        }

        function foundError(error) {
            res.status(400).json(error);
        }
    }

    function updatePage(req, res) {
        var id = req.params.pageId;
        var newPage = req.body;
        
        pageModel
            .updatePage(id, newPage)
            .then(updateSuccess, updateError);

        function updateSuccess(page) {
            res.json(page);
        }

        function updateError(error) {
            res.status(400).json(error);
        }
    }

    function deletePage(req, res) {
        var id = req.params.pageId;
        
        pageModel
            .deletePage(id)
            .then(deleteSuccess, deleteError);

        function deleteSuccess() {
            res.send(true);
        }

        function deleteError(error) {
            res.status(400).json(error);
        }
    }
};