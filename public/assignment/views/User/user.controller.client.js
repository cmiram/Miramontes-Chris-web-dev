(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService) {
        var vm = this;

        vm.login = login;

        function login(username, password) {
            var user = UserService.findUserByUsernameAndPassword(username, password);
            if(user) {
                var id = user._id;
                $location.url("/profile/" + id);
            }
            else {
                vm.error = "User not found";
            }
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;

        vm.register = register;

        function register(username, password, passwordVerify) {
            if(password === passwordVerify) {
                    var newUser = {
                        username: username,
                        password: password
                    }
                if(UserService.createUser(newUser)) {
                    $location.url("/profile/" + UserService.findUserByUsernameAndPassword(username, password)._id);
                }
                model.error = "User could not be created";
            }
            model.error = "Passwords do not match";
        }

    }

    function ProfileController($location, UserService) {
        var vm = this;
    }
})();