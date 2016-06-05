(function(){
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController($location, $routeParams, FlickrService) {
        var vm = this;
        vm.searchPhotos = searchPhotos;

        function init() {
            vm.userId = $routeParams.userId;
            vm.websiteId = $routeParams.websiteId;
            vm.pageId = $routeParams.pageId;
            vm.widgetId = $routeParams.widgetId;
            if($routeParams.searchText != "undefined") {
                vm.initialSearch = $routeParams.searchText;
            }
            else {
                vm.initialSearch = null;
            }
            if(vm.initialSearch) {
                searchPhotos($routeParams.searchText);
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
    }
})();