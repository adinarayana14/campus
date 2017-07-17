app.controller('UploadImagesController', ['$rootScope', '$scope', '$state', '$stateParams', '$interval', '$timeout', '$location', '$cookies', 'cfpLoadingBar', 'CommonService',
    function($rootScope, $scope, $state, $stateParams, $interval, $timeout, $location, $cookies, cfpLoadingBar, CommonService) {

        var data = {
            url: './mediafilesjson',
            method: 'GET',
            cache: false
        };
        CommonService.getListData(data).then(function(responsedata) {
            $scope.mediaFiles = responsedata;
        });

        $scope.cropImage = function() {
            if (!isFileSelected) {
                $scope.alertBox("Please select image to crop");
                return;
            }
            var isChecked = $('#check3').prop('checked');
            $('#croploader').css('display', 'block');
            //console.info($uploadCrop.croppie('get'));
            $uploadCrop.croppie('result', {
                type: 'canvas',
                //size: 'viewport'
                size: {width: 700, height: 394}
                //size: {width: 372, height: 209}
            }).then(function(resp) {
                //console.info(resp);
                isFileSelected = false;
                $("#imagebase64").val(resp);
                jQuery.ajax({
                    url: 'dashboard/upload-image',
                    type: 'POST',
                    data: jQuery("#uploadimagetempform").serialize(),
                    success: function(response) {
                        CommonService.getListData(data).then(function(responsedata) {
                            $scope.imageList = responsedata;
                        });
                    },
                    error: function(jqXhr, statusTxt) {

                    },
                    dataType: 'json',
                    async: false,
                    cache: false
                });
                var canvas = $('#upload-demo canvas.cr-image')[0];
                var context = canvas.getContext('2d');
                // Use the identity matrix while clearing the canvas
                context.setTransform(1, 0, 0, 1, 0, 0);
                context.clearRect(0, 0, canvas.width, canvas.height);
                // Restore the transform
                context.restore();
                $('#croploader').css('display', 'none');
                if (!isChecked) {
                    $("#multiCropImgModal").modal('hide');
                }
            });
        };

        $scope.closeModal = function() {
            $('#multiCropImgModal').modal('hide');
        };

        jQuery("#uploadmediaform").ajaxForm({
            url: './uploadMedia',
            type: 'POST',
            beforeSubmit: function(formData, jqForm, options) {
                var form = jqForm[0];
                if (jQuery.trim(form.uploadfile.value) === "") {
                    $scope.alertBox("Please Choose file to upload");
                    return false;
                }
            },
            success: function(response) {
                $("#uploadmediaform")[0].reset();
                if (response.status === 'error') {
                    $scope.alertBox(response.message);
                } else {
                    $scope.notifyBox('<i class="fa fa-check" aria-hidden="true"></i> File uploaded successfully', 'success');
                    CommonService.getListData(data).then(function(responsedata) {
                        $scope.mediaFiles = responsedata;
                    });
                }
            },
            error: function(jqXhr, statusTxt) {
                //$state.go("newsletter");
            },
            complete: function() {
                //$(".spin-loader").addClass('ng-hide');
            },
            dataType: 'json',
            cache: false
        });
        
        jQuery("#editmediagridform").ajaxForm({
            url: './updateMedia',
            type: 'POST',
            beforeSubmit: function(formData, jqForm, options) {
                $("#mediaSelectModal").modal('hide');
            },
            success: function(response) {
                if (response.status === 'error') {
                    $scope.alertBox(response.message);
                } else {
                    $scope.notifyBox('<i class="fa fa-check" aria-hidden="true"></i> Updated successfully', 'success');
                    CommonService.getListData(data).then(function(responsedata) {
                        $scope.mediaFiles = responsedata;
                    });
                }
            },
            error: function(jqXhr, statusTxt) {
                //$state.go("newsletter");
            },
            complete: function() {
                //$(".spin-loader").addClass('ng-hide');
            },
            dataType: 'json',
            cache: false
        });

        $scope.getIamgeDetails = function(id) {

            //$scope.alertBox("hey id : " + id);
            jQuery.ajax({
                url: './getimagedetails/' + id,
                type: 'POST',
                success: function(response) {
                    $('#editmediagridform').html(response);
                },
                error: function(jqXhr, statusTxt) {
                },
                //dataType: 'json',
                async: false,
                cache: false
            });
        };

        $scope.$watch("mediaFiles", function(newValue, oldValue) {
            $timeout(function() {
                $('#gallery-list').each(function() {
                    $(this).magnificPopup({
                        delegate: 'a.img-link',
                        type: 'image',
                        gallery: {
                            enabled: true
                        }
                    });
                });
                $('.imageremove').click(function(event) {
                    event.preventDefault();
                    var id = jQuery(this).attr("href");
                    $scope.confirmBox("Are you sure want to delete?", function(result) {
                        if (result) {
                            jQuery.ajax({
                                url: 'dashboard/delete-image/' + id,
                                type: 'POST',
                                success: function(response) {
                                    console.info(response.MESSAGE);
                                    if (response.MESSAGE === "ERROR") {
                                        $scope.notifyBox('<i class="fa fa-exclamation-triangle" aria-hidden="true"></i> You can not remove this image. This is being used', 'danger');
                                    } else {
                                        $scope.notifyBox('<i class="fa fa-check" aria-hidden="true"></i> Image deleted successfully', 'success');
                                        CommonService.getListData(data).then(function(responsedata) {
                                            $scope.imageList = responsedata;
                                        });
                                    }
                                },
                                error: function(jqXhr, statusTxt) {
                                },
                                dataType: 'json',
                                async: false,
                                cache: false
                            });
                        } else {
                            $(".spin-loader").addClass('ng-hide');
                        }
                    }, "small");
                });
            });
        });
    }
]);


