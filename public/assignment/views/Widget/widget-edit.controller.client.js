(function() {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;
        vm.widgetHasRequiredFieldsSaved = widgetHasRequiredFieldsSaved;
        vm.searchPhotos = searchPhotos;

        function init() {
            vm.userId = $routeParams.userId;
            vm.websiteId = $routeParams.websiteId;
            vm.pageId = $routeParams.pid;
            vm.widgetId = $routeParams.wgid;
            vm.uploadUrl = "/api/upload/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + vm.widgetId;
            
            WidgetService
                .findWidgetsById(vm.widgetId)
                .then(function(response) {
                        vm.widget = response.data;
                    },
                    function(error){
                        vm.error = error.data;
                    });
        }
        init();

        function updateWidget(widget) {
            var missingFields =  widgetIsMissingNecessaryFields(widget);
            if(missingFields) {
                vm.error = missingFields;
            }   
            else {
                WidgetService
                    .updateWidget(vm.widgetId, widget)
                    .then(function(response) {
                            $location.url("user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                        },
                        function(error) {
                            vm.error = error.data;
                        });
            }
        }

        function deleteWidget() {
            WidgetService
                .deleteWidget(vm.widgetId)
                .then(function(response) {
                        $location.url("user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                    },
                    function(error) {
                        vm.error = error.data;
                    });
        }

        function widgetHasRequiredFieldsSaved() {
            WidgetService
                .findWidgetsById(vm.widgetId)
                .then(function(response) {
                        var widget = response.data;
                        var result = widgetIsMissingNecessaryFields(widget);
                        if(result) {
                            vm.error = result + ". Must save or empty fields before navigating away";
                        }
                        else {
                            $location.url("user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                        }
                    },
                    function(error) {
                        vm.error = error.data;
                    });

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
        
        function searchPhotos(searchText) {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + vm.widgetId + "/flickr/" + searchText);
        }
    }
})();