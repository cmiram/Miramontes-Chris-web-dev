var mongoose = require("mongoose");

module.exports = function(websiteModel) {

    var PageSchema = require("./website.schema.server")();
    var Page = mongoose.model("Page", PageSchema);

    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage,
        pushWidget: pushWidget,
        pullWidget: pullWidget
    }
    return api;

    function createPage(websiteId, page) {
        page._website = websiteId;
        return Page
            .create(page)
            .then(addPageToWebsite);

        function addPageToWebsite(page) {
            return websiteModel.pushPage(websiteId, page._id);
        }
    }

    function findAllPagesForWebsite(websiteId){
        return Page.find({_website: websiteId});
    }

    function findPageById(pageId) {
        return Page.findOne({_id: pageId});
    }

    function updatePage(pageId, page) {
        return Page.update(
            {_id: pageId},
            {
                name: page.name,
                title: page.title,
                description: page.description
            }
        );
    }

    function deletePage(pageId) {
        var websiteId = Page.findOne({_id: pageId})._website;
        var result = Page
            .findOneAndRemove({_id: pageId})
            .then(removePageFromWebsite);
        return result;

        function removePageFromWebsite(page) {
            return websiteModel.pullPage(websiteId, page._id);
        }
    }

    function pushWidget(pageId, widgetId) {
        return Page.update(
            {_id: pageId},
            {$pushAll:
                {
                    widgets: [widgetId]
                }
            }
        );
    }

    function pullWidget(pageId, widgetId) {
        return Page.update(
            {_id: pageId},
            {$pullAll:
                {
                    widgets: [widgetId]
                }
            }
        );
    }
}