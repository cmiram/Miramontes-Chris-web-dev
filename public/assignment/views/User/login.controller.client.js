(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this;

        vm.login = login;

        function login(username, $rootScope, password) {
            var user = {
                username: username,
                password: password
            }
            
            UserService
                .login(user)
                .then(function(res) {
                    var user = res.data;
                    $rootScope.currentUser = user;
                    $location.url("/user/" + user._id);
                })
        }
    }
})();