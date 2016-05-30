(function() {
    angular
        .module("TVTracker")
        .controller("HomeController", HomeController);

    function HomeController($location, UserService) {
        var vm = this;
    }
})();