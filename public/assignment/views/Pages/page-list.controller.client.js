(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($location, PageService) {
        var vm = this;
    }
})();