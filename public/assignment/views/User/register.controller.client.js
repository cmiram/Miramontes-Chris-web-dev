(function() {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;

        vm.register = register;

        function register(username, password, passwordVerify) {
            if (password === passwordVerify) {
                var newUser = {
                    username: username,
                    password: password
                }
                if (UserService.createUser(newUser)) {
                    $location.url("/profile/" + UserService.findUserByUsernameAndPassword(username, password)._id);
                }
                model.error = "User could not be created";
            }
            model.error = "Passwords do not match";
        }

    }
})();