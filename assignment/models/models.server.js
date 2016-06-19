module.exports = function() {
    var userModel = require("./user/user.model.server.js")();
    var websiteModel = require("./website/website.model.server")(userModel);
    var pageModel = require("./page/page.model.server")(websiteModel);
    var widgetModel = require("./widget/widget.model.server")(pageModel);

    var models = {
        userModel: userModel,
        websiteModel: websiteModel,
        pageModel: pageModel,
        widgetModel: widgetModel
    };

    return models;
};