app.controller('HomeController', ['$rootScope', '$scope', '$state', '$stateParams', '$interval', '$timeout', '$location', '$cookies', 'cfpLoadingBar',
    function($rootScope, $scope, $state, $stateParams, $interval, $timeout, $location, $cookies, cfpLoadingBar) {
        console.info("heyyyyy");
        $scope.start = function() {
            cfpLoadingBar.start();
        };

        $scope.complete = function() {
            cfpLoadingBar.complete();
        };
    }
]);
