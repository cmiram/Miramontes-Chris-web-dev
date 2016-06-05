(function() {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.addNewWebsite = addNewWebsite;
        vm.website = {};

        function init() {
            vm.userId = $routeParams.userId;
        }
        init();

        function addNewWebsite(website) {
            if(website.name) {
                WebsiteService
                    .createWebsite(website, vm.userId)
                    .then(function(response) {
                            $location.url("/user/" + vm.userId + "/website");
                        },
                        function(error) {
                            vm.error = error.data;
                        });
            }
            else {
                vm.error = "New Website must have name";
                return;
            }
        }
    }
})();