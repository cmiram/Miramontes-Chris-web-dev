(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("EditWebsiteController", EditWebsiteController)
        .controller("NewWebsiteController", NewWebsiteController);

    function WebsiteListController($location, WebsiteService) {
        var vm = this;
    }
    
    function EditWebsiteController($location, WebsiteService) {
        var vm = this;
    }

    function NewWebsiteController($location, WebsiteService) {
        var vm = this;
    }
})();