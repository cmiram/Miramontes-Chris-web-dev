(function() {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var vm = this;
        var userId = $routeParams["id"];
        vm.updateUser = updateUser;
        
        function init() {
            vm.user = UserService.findUserById(userId);
        }
        init();

        function updateUser(user) {
            var result = UserService.updateUser(userId, user);

            if(result) {
                vm.success = "User successfully updated";
            }
            else {
                vm.error = "User not found";
            }
        }
    }
})();