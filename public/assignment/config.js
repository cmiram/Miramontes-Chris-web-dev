(function(){
    angular
        .module("WebAppMaker")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "views/User/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html"
            })
            .when("/profile/:id", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/user/:userId/website", {
                templateUrl: "views/website/website-list.view.client.html",
                controller: "WebsiteListController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/:websiteId", {
                templateUrl: "views/website/website-edit.view.client.html",
                controller: "EditWebsiteController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/:websiteId/page", {
                templateUrl: "views/Pages/page-list.view.client.html"
            })
            .when("/user/:userId/website/:websiteId/page/new", {
                templateUrl: "views/Pages/page-new.view.client.html"
            })
            .when("/user/:userId/website/:websiteId/page/:pid", {
                templateUrl: "views/Pages/page-edit.view.client.html"
            })
            .when("/user/:userId/website/:websiteId/page/:pid/widget", {
                templateUrl: "views/Widget/widget-list.view.client.html"
            })
            .when("/user/:userId/website/:websiteId/page/:pid/widget/new", {
                templateUrl: "views/Widget/widget-chooser.view.client.html"
            })
            .when("/user/:userId/website/:websiteId/page/:pid/widget/:wgid", {
                templateUrl: "views/widget/widget-edit.view.client.html"
            })
            .otherwise({
                redirectTo: "/login"
            });
    }
})();