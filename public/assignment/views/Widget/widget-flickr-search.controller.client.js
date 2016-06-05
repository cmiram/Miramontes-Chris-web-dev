(function(){
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController($location, $routeParams, FlickrService, WidgetService) {
        var vm = this;
        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;

        function init() {
            vm.userId = $routeParams.userId;
            vm.websiteId = $routeParams.websiteId;
            vm.pageId = $routeParams.pid;
            vm.widgetId = $routeParams.wgid;

            if($routeParams.searchText != "undefined") {
                vm.initialSearch = $routeParams.searchText;
            }
            else {
                vm.initialSearch = null;
            }

            if(vm.initialSearch) {
                searchPhotos(vm.initialSearch);
            }
        }
        init();

        function searchPhotos(searchText) {
            FlickrService
                .searchPhotos(searchText)
                .then(
                    function(response) {
                        data = response.data.replace("jsonFlickrApi(","");
                        data = data.substring(0,data.length - 1);
                        data = JSON.parse(data);
                        vm.photos = data.photos;
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );
        }

        function selectPhoto(photo) {
            WidgetService
                .findWidgetsById(vm.widgetId)
                .then(function(response) {
                        var widget = response.data;
                        widget.url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" +
                            photo.id + "_" + photo.secret + "_s.jpg";
                        WidgetService.updateWidget(widget._id, widget)
                            .then(function(response) {
                                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" +
                                        vm.pageId + "/widget/" + vm.widgetId);
                                },
                                function(error) {
                                    vm.error = error.data;
                                });
                    },
                    function(error) {
                        vm.error = error.data;
                    });
        }
    }
})();