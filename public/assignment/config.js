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
                templateUrl: "views/User/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/profile/:id", {
                templateUrl: "views/User/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/general/:userId/website", {
                templateUrl: "views/Website/website-list.view.client.html",
                controller: "WebsiteListController",
                controllerAs: "model"
            })
            .when("/general/:userId/website/new", {
                templateUrl: "views/Website/website-new.view.client.html",
                controller: "NewWebsiteController",
                controllerAs: "model"
            })
            .when("/general/:userId/website/:websiteId", {
                templateUrl: "views/Website/website-edit.view.client.html",
                controller: "EditWebsiteController",
                controllerAs: "model"
            })
            .when("/general/:userId/website/:websiteId/page", {
                templateUrl: "views/Pages/page-list.view.client.html",
                controller: "PageListController",
                controllerAs: "model"
            })
            .when("/general/:userId/website/:websiteId/page/new", {
                templateUrl: "views/Pages/page-new.view.client.html",
                controller: "NewPageController",
                controllerAs: "model"
            })
            .when("/general/:userId/website/:websiteId/page/:pid", {
                templateUrl: "views/Pages/page-edit.view.client.html",
                controller: "EditPageController",
                controllerAs: "model"
            })
            .when("/general/:userId/website/:websiteId/page/:pid/widget", {
                templateUrl: "views/Widget/widget-list.view.client.html",
                controller: "WidgetListController",
                controllerAs: "model"
            })
            .when("/general/:userId/website/:websiteId/page/:pid/widget/new", {
                templateUrl: "views/Widget/widget-new.view.client.html",
                controller: "NewWidgetController",
                controllerAs: "model"
            })
            .when("/general/:userId/website/:websiteId/page/:pid/widget/:wgid", {
                templateUrl: "views/Widget/widget-edit.view.client.html",
                controller: "EditWidgetController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/login"
            });
    }
})();