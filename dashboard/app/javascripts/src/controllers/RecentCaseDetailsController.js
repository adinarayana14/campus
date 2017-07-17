app.controller('RecentCaseDetailsController', ['$rootScope', '$scope', '$state', '$stateParams', '$http', '$interval', '$timeout', '$location', '$cookies', 'cfpLoadingBar', 'CommonService',
    function($rootScope, $scope, $state, $stateParams, $http, $interval, $timeout, $location, $cookies, cfpLoadingBar, CommonService) {
        $scope.caseId = $stateParams.caseId;
        var data = {
            url: 'dashboard/upload-images-json',
            method: 'GET',
            cache: false
        };
        CommonService.getListData(data).then(function(responsedata) {
            $scope.imageList = responsedata;
        });
        $('#description').summernote({
            height: 200,
            toolbar: [
                ['style', ['style']],
                ['font-style', ['bold', 'italic', 'underline', 'clear']],
                ['font', ['strikethrough', 'superscript', 'subscript']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['table', ['table']],
                ['insert', ['link', 'picture', 'help', 'codeview']]
            ]
        });
        
        $scope.selectImage = function() {
            $('#imageid').val(this.image.id);
            $scope.imgObj = this;
            var img = $('<img>').attr({
                src : $scope.imgObj.image.image_path + '/' + $scope.imgObj.image.image_thumb,
                width : '100%'
            });
            $('#selectedimages').empty().html(img);
            $('#imageSelectModal').modal('hide');
        };

        $scope.saveRecentCase = function() {
            $('#recentcaseform .form-group').removeClass('has-error');
            $('#recentcaseform .form-group .text-red').remove();
            var data = {
                url: 'dashboard/saveRecentCase/' + $scope.caseId,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: jQuery("#recentcaseform").serialize(),
                cache: false
            };
            CommonService.postFormData(data).then(function(responsedata) {
                if (!responsedata.validate) {
                    $scope.notifyBox('<i class="fa fa-times" aria-hidden="true"></i> Please correct the data', 'warning');
                    angular.forEach(responsedata.errors, function(value, key) {
                        $('#' + key).parent().addClass('has-error');
                        $('#' + key).parent().append(value);
                    });
                } else {
                    $scope.notifyBox('<i class="fa fa-check" aria-hidden="true"></i> Saved successfully', 'success');
                    $state.go('recentcasedetails', {caseId: responsedata.caseid}, {reload: true});
                    //$state.go('^.recentcasedetails', {caseId: responsedata.caseid}, {reload: 'recentcasedetails', location: false});
                }
            });
        };

        $scope.postRecentCase = function() {
            //$scope.alertBox("Please save the case");
            if ($scope.caseId === "0") {
                $scope.alertBox("Please save the case");
                return;
            }
            var data = {
                url: 'dashboard/postRecentCase/' + $scope.caseId,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                cache: false
            };
            $scope.confirmBox("Are you sure want to post this case?", function(result) {
                if (result) {
                    CommonService.postFormData(data).then(function(responsedata) {
                        $scope.notifyBox('<i class="fa fa-info-circle" aria-hidden="true"></i> Posted successfully');
                        $state.go('recentcases');
                    });
                }
            });

        };
    }
]);
