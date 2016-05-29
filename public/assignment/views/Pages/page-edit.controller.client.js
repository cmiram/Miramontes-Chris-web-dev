(function() {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            vm.userId = $routeParams.userId;
            vm.websiteId = $routeParams.websiteId;
            vm.pageId = $routeParams.pid;
            vm.page = JSON.parse(JSON.stringify(PageService.findPageById(vm.pageId)));
        }
        init();

        function updatePage(page) {
            if(page.name) {
                var result = PageService.updatePage(vm.pageId, page);
                if(result) {
                    $location.url("user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                }
                else {
                    page.error = "Unable to update page";
                }
            }
            else {
                page.error = "Page must have a name";
            }
        }
        
        function deletePage() {
            var result = PageService.deletePage(vm.pageId);
            if(result) {
                $location.url("user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            }
            else {
                vm.error = "Unable to delete page";
            }
        }
        
    }
})();