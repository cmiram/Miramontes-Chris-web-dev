(function() {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.createWidget = createWidget;

        function init() {
            vm.userId = $routeParams.userId;
            vm.websiteId = $routeParams.websiteId;
            vm.pageId = $routeParams.pid;
        }
        init();

        function createWidget(type) {
            var widget = {
                widgetType: type,
                pageId: vm.pageId
            };

            WidgetService
                .createWidget(vm.pageId, widget)
                .then(function(response) {
                        $location.url("user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + response.data._id);
                    },
                    function(error){
                        vm.error = error.data;
                    });
        }
    }
})();