(function(){
    angular
        .module("WebAppMaker")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "assignment/views/User/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "assignment/views/user/register.view.client.html"
            })
            .when("/profile/:id", {
                templateUrl: "assignment/views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/user/:userId/website", {
                templateUrl: "assignment/views/website/website-list.view.client.html",
                controller: "WebsiteListController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/:websiteId", {
                templateUrl: "assignment/views/website/website-edit.view.client.html",
                controller: "EditWebsiteController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/:websiteId/page", {
                templateUrl: "assignment/views/Pages/page-list.view.client.html"
            })
            .when("/user/:userId/website/:websiteId/page/new", {
                templateUrl: "assignment/views/Pages/page-new.view.client.html"
            })
            .when("/user/:userId/website/:websiteId/page/:pid", {
                templateUrl: "assignment/views/Pages/page-edit.view.client.html"
            })
            .when("/user/:userId/website/:websiteId/page/:pid/widget", {
                templateUrl: "assignment/views/Widget/widget-list.view.client.html"
            })
            .when("/user/:userId/website/:websiteId/page/:pid/widget/new", {
                templateUrl: "assignment/views/Widget/widget-chooser.view.client.html"
            })
            .when("/user/:userId/website/:websiteId/page/:pid/widget/:wgid", {
                templateUrl: "assignment/views/widget/widget-edit.view.client.html"
            })
            .otherwise({
                redirectTo: "/login"
            });
    }
})();