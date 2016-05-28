(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($location, $routeParams, PageService) {
        var vm = this;

        function init() {
            vm.userId = $routeParams.userId;
            vm.websiteId = $routeParams.websiteId;
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }
        init();
    }
})();