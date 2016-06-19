(function() {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {
            createUser: createUser,
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findUserById: findUserById,
            updateUser: updateUser,
            deleteUser: deleteUser,
            login: login,
            logout: logout,
            register: register,
            checkLoggedin: checkLoggedin
        };
        return api;

        function createUser(user) {
            var url = "/api/user";
            return $http.post(url, user);
        }
        
        function findUserByUsernameAndPassword(username, password) {
            var url = "/api/user?username=" + username + "&password=" + password;
            return $http.get(url);
        }
        
        function findUserById(id) {
            var url = "/api/user/" + id;
            return $http.get(url);
        }
        function updateUser(id, user) {
            var url = "/api/user/" + id;
            return $http.put(url, user);
        }
        function deleteUser(id) {
            var url = "/api/user/" + id;
            return $http.delete(url);
        }
        
        function login(user) {
            return $http.post("/api/login", user);
        }
        
        function logout(user) {
            return $http.post("/api/logout");
        }
        
        function register(user) {
            return $http.post("/api/register", user);
        }
        
        function checkLoggedin() {
            return $http.get("/api/loggedin");
        }
    }
})();