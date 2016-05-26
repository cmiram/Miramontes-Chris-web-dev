(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService) {
        var vm = this;
    }
    
    function RegisterController($location, UserService) {
        var vm = this;
    }

    function ProfileController($location, UserService) {
        var vm = this;
    }
})();