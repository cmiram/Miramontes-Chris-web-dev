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
            console.log(website);
            if(website.name) {
                var result = WebsiteService.createWebsite(website, vm.userId);

                if(result) {
                    console.log(WebsiteService.findWebsitesByUser(vm.userId));
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