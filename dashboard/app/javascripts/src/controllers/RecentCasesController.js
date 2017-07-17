app.controller('RecentCasesController', ['$rootScope', '$scope', '$state', '$stateParams', '$interval', '$timeout', '$location', '$cookies', 'cfpLoadingBar', 'CommonService',
    function($rootScope, $scope, $state, $stateParams, $interval, $timeout, $location, $cookies, cfpLoadingBar, CommonService) {
        var data = {
            url: 'dashboard/recent-cases-json',
            method: 'GET',
            cache: false
        };

        var deleteData = {
            url: 'dashboard/delete-case',
            method: 'POST',
            data: {},
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            cache: false
        };

        CommonService.getListData(data).then(function(responsedata) {
            $scope.caseList = responsedata;
        });
        /*$scope.$watchCollection('caseList', function(newValue, oldValue) {
         console.info(newValue); 
         console.info(oldValue);
         });*/
        $scope.deleteCase = function(id) {
            $scope.confirmBox("Are you sure want to delete this case?", function(result) {
                if (result) {
                    deleteData.data = $.param({caseId: id});
                    CommonService.postFormData(deleteData).then(function(responsedata) {
                        $scope.notifyBox('<i class="fa fa-trash" aria-hidden="true"></i> Record deleted successfully', 'warning');
                        CommonService.getListData(data).then(function(responsedata) {
                            $scope.caseList = responsedata;
                        });
                    });
                }
            });
        };
    }
]);
