(function(){
    angular
        .module("TVTracker")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/general/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/general/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/general/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user/home/:uid", {
                templateUrl: "views/user/user-home.view.client.html",
                controller: "UserHomeController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();