(function() {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController)
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController);

    function EditPageController($location, PageService) {
        var vm = this;
    }

    function PageListController($location, PageService) {
        var vm = this;
    }

    function NewPageController($location, PageService) {
        var vm = this;
    }
})();