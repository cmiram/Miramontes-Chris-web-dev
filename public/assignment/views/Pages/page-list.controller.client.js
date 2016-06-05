(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        var vm = this;

        function init() {
            vm.userId = $routeParams.userId;
            vm.websiteId = $routeParams.websiteId;
            PageService
                .findPageByWebsiteId(vm.websiteId)
                .then(function(response) {
                        vm.pages = response.data;
                    },
                    function(error) {
                        vm.error = error.data;
                    });
        }
        init();
    }
})();