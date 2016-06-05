module.exports = function(app) {
    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    app.post("/api/upload/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId", upload.single('myFile'), uploadImage);

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);

    function createWidget(req,res) {
        var newWidget = req.body;
        newWidget._id = (new Date()).getTime().toString();
        widgets.push(newWidget);
        res.json(newWidget);
    }

    function findAllWidgetsForPage(req,res) {
        var id = req.params.pageId;
        var result = [];

        for(var i in widgets) {
            if(widgets[i].pageId = id) {
                result.push(widgets[i]);
            }
        }
        res.json(result);
    }

    function findWidgetById(req,res) {
        var id = req.params.widgetId;

        for(var i in widgets) {
            if(widgets[i]._id === id) {
                res.send(widgets[i]);
                return;
            }
        }
        res.status(403);
    }

    function updateWidget(req,res) {
        var newWidget = req.body;
        var id = req.params.widgetId;

        for(var i in widgets) {
            if(widgets[i]._id === id) {
                widgets[i] = newWidget;
                res.send(newWidget);
                return;
            }
        }
        res.status(403);
    }

    function deleteWidget(req,res) {
        var id = req.params.widgetId;

        for(var i in widgets) {
            if(widgets[i]._id === id) {
                widgets.splice(i, 1);
                res.send(200);
                return;
            }
        }
        res.status(403);
    }

    function uploadImage(req, res) {
        var userId = req.params.userId;
        var websiteId = req.params.websiteId;
        var pageId = req.params.pageId;
        var widgetId = req.params.widgetId;

        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        for(var i in widgets) {
            if(widgets[i]._id === widgetId) {
                widgets[i].url = "/uploads/"+filename;
            }
        }

        res.redirect("/assignment/index.html#/user/" + userId + "/website/" + websiteId +
            "/page/" + pageId + "/widget/" + widgetId);
    }
};