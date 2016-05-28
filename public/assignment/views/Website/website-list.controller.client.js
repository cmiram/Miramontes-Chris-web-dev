(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;

        function init() {
            vm.userId = $routeParams.userId;
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();
    }
})();