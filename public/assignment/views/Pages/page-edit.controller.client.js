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
            PageService
                .findPageById(vm.pageId)
                .then(function(response) {
                        vm.page = response.data;
                    },
                    function(error){
                        vm.error = error.data;
                    });
        }
        init();

        function updatePage(page) {
            if(page.name) {
                PageService
                    .updatePage(vm.pageId, page)
                    .then(function(response){
                            $location.url("user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                        },
                        function(error) {
                            vm.error = error.data;
                        });
            }
            else {
                page.error = "Page must have a name";
            }
        }

        function deletePage() {
            PageService
                .deletePage(vm.pageId)
                .then(function(response) {
                        $location.url("user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                    },
                    function(error) {
                        vm.error = error.data;
                    });
        }
    }
})();