(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($location, WidgetService) {
        var vm = this;
    }
})();