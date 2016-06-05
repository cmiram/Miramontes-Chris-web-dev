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

                UserService
                    .createUser(newUser)
                    .then(function(response) {
                        $location.url("/profile/" + UserService.findUserByUsernameAndPassword(username, password)._id);
                    },
                        function(error) {
                            vm.error = error.data;
                        });
            }
            else {
                vm.error = "Passwords do not match";
            }
        }

    }
})();