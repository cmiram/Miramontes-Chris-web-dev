module.exports = function(pageModel) {

    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server")();
    var Widget = mongoose.model("Widget", WidgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget
    }
    return api;

    function createWidget(pageId, widget) {
        widget._page = pageId;
        var widgetId;
        return Widget
            .create(widget)
            .then(addWidgetToPage)
            .then(returnWidgetId);

        function addWidgetToPage(widget) {
            widgetId = widget._id;
            return pageModel.pushWidget(pageId, widget._id);
        }

        function returnWidgetId() {
            return widgetId;
        }
    }

    function findAllWidgetsForPage(pageId) {
        return Widget.find({_page: pageId});
    }

    function findWidgetById(widgetId) {
        return Widget.findOne({_id: widgetId});
    }

    function updateWidget(widgetId, widget) {
        return Widget.update(
            {_id: widgetId},
            {
                $set: {
                    name: widget.name || null,
                    text: widget.text || null,
                    placeholder: widget.placeholder || null,
                    description: widget.description || null,
                    url: widget.url || null,
                    width: widget.width || null,
                    height: widget.height || null,
                    rows: widget.rows || null,
                    size: widget.size || null,
                    class: widget.class || null,
                    icon: widget.icon || null,
                    deletable: widget.deletable || null,
                    formatted: widget.formatted || null,
                    dateUpdated: widget.dateUpdated || null
                }
            }
        );
    }

    function deleteWidget(widgetId) {
        var pageId = Widget.findOne({_id: widgetId})._page;
        var result = Widget
            .findOneAndRemove({_id: widgetId})
            .then(removeWidgetFromPage);
        return result;

        function removeWidgetFromPage(widget) {
            return pageModel.pullWidget(pageId, widget._id);
        }
    }

    function reorderWidget(pageId, start, end) {
       return pageModel.reorderWidget(pageId, start, end);
    }
}