(function() {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.createNewPage = createNewPage;

        function init() {
            vm.userId = $routeParams.userId;
            vm.websiteId = $routeParams.websiteId;
        }
        init();

        function createNewPage(page) {
            if(page && page.name) {
                PageService
                    .createPage(vm.websiteId, page)
                    .then(function(response) {
                            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                        },
                        function(error) {
                            vm.error = error.data;
                        });
            }
            else {
                vm.error = "New page must have name";
                return;
            }
        }
    }

})();