(function() {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            vm.userId = $routeParams.userId;
            vm.websiteId = $routeParams.websiteId;
            vm.pageId = $routeParams.pid;
            vm.widgetId = $routeParams.wgid;
            vm.widget = JSON.parse(JSON.stringify(WidgetService.findWidgetsById(vm.widgetId)));
            console.log(vm.widget);
        }
        init();
        
        function updateWidget(widget) {
            var result = WidgetService.updateWidget(vm.widgetId, widget);

            if(result) {
                $location.url("user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            }
            else {
                vm.error = "Unable to update Widget";
            }
        }
        
        function deleteWidget() {
            var result = WidgetService.deleteWidget(vm.widgetId);
            
            if(result) {
                $location.url("user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            }
            else {
                vm.error = "Unable to delete Widget";
            }
        }
    }
})();