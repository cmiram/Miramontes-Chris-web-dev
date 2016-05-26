(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("EditWidgetController", EditWidgetController)
        .controller("NewWidgetController", NewWidgetController);

    function WidgetListController($location, WidgetService) {
        var vm = this;
    }

    function EditWidgetController($location, WidgetService) {
        var vm = this;
    }

    function NewWidgetController($location, WidgetService) {
        var vm = this;
    }
})();