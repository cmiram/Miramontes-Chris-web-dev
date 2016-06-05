(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;

        function init() {
            vm.userId = $routeParams.userId;
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .then(function (response) {
                        vm.websites = response.data;
                    },
                    function(error) {
                        vm.error = error.data;
                    });
        }
        init();
    }
})();