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
            }

            widget = WidgetService.createWidget(widget);

            if(widget) {
                $location.url("user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + widget._id);
            }
            else {
                vm.error = "Unable to create widget";
            }
        }
    }
})();