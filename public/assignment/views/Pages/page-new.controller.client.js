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
                var result = PageService.createPage(vm.websiteId, page);

                if(result) {
                    $location.url("/User/" + vm.userId + "/Website/" + vm.websiteId + "/page");
                }
                else {
                    vm.error = "Unable to create new page";
                    return;
                }
            }
            else {
                vm.error = "New page must have name";
                return;
            }
        }
    }
    
})();