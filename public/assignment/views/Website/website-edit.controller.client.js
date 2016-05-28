(function() {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;
        
        function init() {
            vm.userId = $routeParams.userId;
            vm.websiteId = $routeParams.websiteId;
            vm.website = JSON.parse(JSON.stringify((WebsiteService.findWebsiteById(vm.websiteId))));
        }
        init();
        
        function updateWebsite(website) {
            var result = WebsiteService.updateWebsite(vm.websiteId, website);
            if (result) {
                $location.url("user/" + vm.userId + "/website");
            }
            else {
                vm.error = "Unable to update";
            }
        }
        
        function deleteWebsite() {
            var result = WebsiteService.deleteWebsite(vm.websiteId);
            if (result) {
                $location.url("user/" + vm.userId + "/website");
            }
            else {
                vm.error = "Unable to delete website";
            }
        }
    }
})();