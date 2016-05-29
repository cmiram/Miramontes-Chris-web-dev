(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($routeParams, $sce, WidgetService) {
        var vm = this;
        vm.getYoutubeUrl = getYoutubeUrl;
        vm.getHtml = getHtml;

        function init() {
            vm.userId = $routeParams.userId;
            vm.websiteId = $routeParams.websiteId;
            vm.pageId = $routeParams.pid;
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
        }
        init();

        function getYoutubeUrl(widget) {
            var url = widget.url;
            var videoId;
            var index;
            for(var i=url.length; i>0; i--) {
                if(url[i] == '/' || url[i] == '=') {
                    index = i+1;
                    break;
                }
            }
            videoId = url.substr(index);
            return $sce.trustAsResourceUrl("https://youtube.com/embed/" + videoId);
        }

        function getHtml(widget) {
            return $sce.trustAsHtml(widget.text);
        }
    }
})();