(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, $rootScope, UserService) {
        var vm = this;

        vm.login = login;

        function login(username, password) {
            UserService
                .login(username, password)
                .then(function(res) {
                    var user = res.data;
                    $rootScope.currentUser = user;
                    $location.url("/profile/" + user._id);
                })
        }
    }
})();