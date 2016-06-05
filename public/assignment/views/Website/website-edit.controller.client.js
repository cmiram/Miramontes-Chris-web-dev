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
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .then(function(response) {
                        vm.website = response.data;
                    },
                    function(error) {
                        vm.error = error.data;
                    });
        }
        init();

        function updateWebsite(website) {
            WebsiteService
                .updateWebsite(vm.websiteId, website)
                .then(function(response) {
                        $location.url("user/" + vm.userId + "/website");
                    },
                    function(error) {
                        vm.error = error.data;
                    });
        }

        function deleteWebsite() {
            WebsiteService
                .deleteWebsite(vm.websiteId)
                .then(function(response) {
                        $location.url("user/" + vm.userId + "/website");
                    },
                    function(error) {
                        vm.error = error.data;
                    });
        }
    }
})();