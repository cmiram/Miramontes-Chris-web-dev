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
        }
        init();
        
        function updateWidget(widget) {
            var missingFields =  widgetIsMissingNecessaryFields(widget);
            if(missingFields) {
                vm.error = missingFields;
            }
            else {
                var result = WidgetService.updateWidget(vm.widgetId, widget);

                if(result) {
                    $location.url("user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                }
                else {
                    vm.error = "Unable to update Widget";
                }
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

        function widgetIsMissingNecessaryFields(widget) {
            switch(widget.widgetType) {
                case "HEADER":
                    if(!widget.text || !widget.size) {
                        return "Text and Size are required fields";
                    }
                    return null;
                case "HTML":
                    if(!widget.text) {
                        return "Text is a required field";
                    }
                    return null;
                case "IMAGE":
                    if(!widget.url) {
                        return "URL is a required field";
                    }
                    return null;
                case "YOUTUBE":
                    if(!widget.url) {
                        return "URL is a required field";
                    }
                    return null;
            }
        }
    }
})();