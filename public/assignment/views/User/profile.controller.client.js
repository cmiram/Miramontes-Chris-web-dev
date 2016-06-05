(function() {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.userId = $routeParams.id;
        vm.updateUser = updateUser;

        function init() {
            UserService
                .findUserById(vm.userId)
                .then(function(response) {
                    vm.user = response.data;
                },
                function(error) {
                   vm.error = "Login failed";
                });
        }
        init();

        function updateUser(user) {
            UserService
                .updateUser(vm.userId, user)
                .then(function(response) {
                    var result = response.data;
                    if(result) {
                        vm.success = "User successfully updated";
                    }
                    else {
                        vm.error = "User not found";
                    }
                },
                function(error) {
                   vm.error = "User not found";
                });
        }
    }
})();