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
                var result = WebsiteService.createWebsite(website, vm.userId);

                if(result) {
                    $location.url("/user/" + vm.userId + "/website");
                }
                else {
                    vm.error = "Unable to create new website";
                    return;
                }
            }
            else {
                vm.error = "New website must have name";
                return;
            }
        }
    }
})();