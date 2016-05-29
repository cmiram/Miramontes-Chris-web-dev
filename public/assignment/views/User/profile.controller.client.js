(function() {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.userId = $routeParams.id;
        vm.updateUser = updateUser;

        function init() {
            vm.user = JSON.parse(JSON.stringify(UserService.findUserById(vm.userId)));
        }
        init();

        function updateUser(user) {
            var result = UserService.updateUser(vm.userId, user);

            if(result) {
                vm.success = "user successfully updated";
            }
            else {
                vm.error = "user not found";
            }
        }
    }
})();