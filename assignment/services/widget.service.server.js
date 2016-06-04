module.exports = function(app) {

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

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);

    function createWidget(req,res) {
        var newWidget = req.body;
        var pageId = req.params.pageId;
        newWidget._id = (new Date()).getTime().toString();
        newWidget.pageId = pageId;
        widgets.push(newWidget);
        res.json(newWidget);
    }

    function findAllWidgetsForPage(req,res) {
        var id = req.params.pageId;
        var result = [];

        for(var i in pages) {
            if(pages[i].pageId = id) {
                result.push(pages[i]);
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
                newWidget._id = id;
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
};