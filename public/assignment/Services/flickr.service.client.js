(function () {
    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);

    function FlickrService($http) {

        var api = {
            searchPhotos: searchPhotos
        };
        return api;

        function searchPhotos(searchTerm) {
            var url = $http.get("/api/widget/flickrSearchUrl", searchTerm).url;
            return $http.get(url);
        }
    }
})();