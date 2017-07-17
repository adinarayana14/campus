'use strict';

var app = angular.module('CampusApp', [
    'ui.router',
    'ui.bootstrap',
    'ngAnimate',
    'ngCookies',
    'base64',
    'oc.lazyLoad',
    'chart.js',
    'chieffancypants.loadingBar'
]);

app.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: './home',
            controller: 'HomeController'
        }).state('recentcases', {
            url: '/recentcases',
            templateUrl: 'dashboard/recent-cases',
            controller: 'RecentCasesController'
        }).state('recentcasedetails', {
            url: '/recentcasedetails/{caseId:[0-9]{1,10}}',
            templateUrl: function(params) {
                return 'dashboard/recent-cases-details/' + params.caseId;
            },
            controller: 'CommonController',
            resolve: {
                loadScripts: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'assets/dashboard/app/javascripts/vender/texteditor/summernote.min.js',
                            'assets/dashboard/app/css/vender/summernote.css']);
                    }]
            }
        }).state('mediafiles', {
            url: '/mediafiles',
            templateUrl: function(params) {
                return './mediafiles';
            },
            controller: 'UploadImagesController',
            resolve: {
                loadScripts: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            '../dashboard/theme/js/croppie.min.js',
                            '../dashboard/theme/js/exif.js',
                            '../dashboard/theme/css/croppie.css',
                            '../dashboard/theme/js/jquery.magnific-popup.js',
                            '../dashboard/theme/css/magnific-popup.css']);
                    }]
            }
        }).state('homepage', {
            url: '/homepage',
            templateUrl: './gethomepage',
            controller: 'CommonController'
        }).state('successstories', {
            url: '/successstories',
            templateUrl: './getSuccessStories',
            controller: 'CommonController'
        }).state('news', {
            url: '/news',
            templateUrl: './getNews',
            controller: 'CommonController'
        }).state('storydetails', {
            url: '/storydetails/{type:[0-9]{1,2}}/{postId:[0-9]{1,10}}',
            templateUrl: function(params) {
                return './getCampusPost/' + params.type + '/' + params.postId;
            },
            controller: 'CommonController',
            resolve: {
                loadScripts: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            '../dashboard/app/javascripts/vender/texteditor/summernote.min.js',
                            '../dashboard/app/css/vender/summernote.css']);
                    }]
            }
        }).state('newsdetails', {
            url: '/newsdetails/{type:[0-9]{1,2}}/{postId:[0-9]{1,10}}',
            templateUrl: function(params) {
                return './getCampusPost/' + params.type + '/' + params.postId;
            },
            controller: 'CommonController',
            resolve: {
                loadScripts: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            '../dashboard/app/javascripts/vender/texteditor/summernote.min.js',
                            '../dashboard/app/css/vender/summernote.css']);
                    }]
            }
        }).state('globalclients', {
            url: '/globalclients',
            templateUrl: './globalClients',
            controller: 'CommonController'
        }).state('dataprotection', {
            url: '/dataprotection',
            templateUrl: './dataprotection',
            controller: 'CommonController',
            resolve: {
                loadScripts: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            '../dashboard/app/javascripts/vender/texteditor/summernote.min.js',
                            '../dashboard/app/css/vender/summernote.css']);
                    }]
            }
        });


        $urlRouterProvider.otherwise('home');

    }
]).run(function($state, $rootScope, $location, $cookies, $templateCache) {
    $rootScope.$state = $state;
    // Making the page always scroll to the top when the view changes
    $rootScope.$on('$stateChangeSuccess', function() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        $templateCache.removeAll();
    });
    $rootScope.$on('$viewContentLoaded', function() {
        $templateCache.removeAll();
    });
});


app.controller('PrimaryController', ['$rootScope', '$scope', '$state', '$interval', '$timeout', '$location', '$cookies',
    function($rootScope, $scope, $state, $interval, $timeout, $location, $cookies) {

        // Just some filler text for views that don't exist yet [REMOVE THIS LATER]
        $scope.loremIpsum = 'We apologize, but the functionality for this part of the app is currently in development. We thank you for you consideration and understanding as we work to bring you these features.';

        //viewContentLoading is used to show/hide content and progress bar (spinner icon) when loading new pages
        // $rootScope.viewContentLoading = false;
        $rootScope.$on('$stateChangeStart', function(event) {
            //$rootScope.viewContentLoading = true;
        });
        $rootScope.$on('$stateChangeSuccess', function(event) {
            //cfpLoadingBar.complete();
            $timeout(function() {
                //$rootScope.viewContentLoading = false;
            }, 300);
        });
        $rootScope.$on('$stateChangeError', function(event, p1, p2, p3) {
            //cfpLoadingBar.complete();
            // $rootScope.viewContentLoading = false;
        });

        $scope.menuItems = [
            {
                "id": "home",
                "icon": "fa fa-th",
                "label": "Dashboard",
                "active": {"0": "home"}
            },
            {
                "id": "mediafiles",
                "icon": "fa fa-file-image-o",
                "label": "Media",
                "active": {"0": "mediafiles"}
            },
            {
                "id": "homepage",
                "icon": "fa fa-th",
                "label": "Home Page",
                "active": {"0": "homepage"}
            },
            /*{
                "id": "products",
                "icon": "fa fa-th",
                "label": "Products",
                "active": {"0": "products"}
            },*/
            {
                "id": "successstories",
                "icon": "fa fa-th",
                "label": "Success Stories",
                "active": {"0": "successstories", "1" : "storydetails"}
            },
            {
                "id": "news",
                "icon": "fa fa-th",
                "label": "News",
                "active": {"0": "news", "1" : "newsdetails"}
            },
            {
                "id": "globalclients",
                "icon": "fa fa-th",
                "label": "Global Clients",
                "active": {"0": "globalclients"}
            },
            /*{
                "id": "integrations",
                "icon": "fa fa-th",
                "label": "Integrations",
                "active": {"0": "integrations"}
            },
            {
                "id": "iestimonials",
                "icon": "fa fa-th",
                "label": "Testimonials",
                "active": {"0": "iestimonials"}
            },*/
            {
                "id": "dataprotection",
                "icon": "fa fa-th",
                "label": "Data Protection Policy",
                "active": {"0": "dataprotection"}
            }
        ];

        $scope.hasActiveMenu = function(activeMenus) {
            var isActive = false;
            angular.forEach(activeMenus, function(value, key) {
                //console.info(value);
                if ($state.includes(value)) {
                    //console.info("------------------------------");
                    isActive = true;
                    return false;
                }
            });
            return isActive;
        };

        $scope.confirmYesNo = function(title, message, yescallback, nocallback, size) {
            bootbox.dialog({
                message: message,
                title: title,
                size: size !== undefined || size === null ? size : null,
                buttons: {
                    no: {
                        label: "No",
                        className: "btn-default",
                        callback: function() {
                            if (nocallback) {
                                nocallback();
                            }
                        }
                    },
                    yes: {
                        label: "Yes",
                        className: "btn-primary",
                        callback: function() {
                            yescallback();
                        }
                    }
                }
            });
        };

        $scope.confirmBox = function(message, callBackResults, size) {
            bootbox.confirm({
                size: size !== undefined || size === null ? size : null,
                message: message,
                callback: function(result) {
                    if (callBackResults) {
                        callBackResults(result);
                    }
                }
            });
        };

        $scope.alertBox = function(message, callBackOk, size) {
            bootbox.alert({
                size: size !== undefined || size === null ? size : null,
                message: message,
                callback: function() {
                    if (callBackOk) {
                        callBackOk();
                    }
                }
            });
        };

        $scope.notifyBox = function(message, type) {
            if (!type) {
                type = "info";
            }
            $.notify(message, {
                allow_dismiss: false,
                delay: 2000,
                type: type
            });
        };
    }
]);

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




app.controller('CommonController', ['$rootScope', '$scope', '$state', '$stateParams', '$interval', '$timeout', '$location', '$cookies', 'cfpLoadingBar', 'CommonService',
    function($rootScope, $scope, $state, $stateParams, $interval, $timeout, $location, $cookies, cfpLoadingBar, CommonService) {
        $scope.caseId = $stateParams.caseId;
        console.info($state.current.name);
        var data = {
            url: './mediafilesjson',
            method: 'GET',
            cache: false
        };
        $scope.getImages = function() {
            CommonService.getListData(data).then(function(responsedata) {
                $scope.mediaFiles = responsedata;
            });
        };

        $scope.selectImage = function() {
            $('#imageid').val(this.image.id);
            $scope.imgObj = this;
            var img = $('<img>').attr({
                src: "../" + $scope.imgObj.image.m_path + '/' + $scope.imgObj.image.m_name,
                width: '100%'
            });
            $('#selectedimages').empty().html(img);
            $('#imageSelectModal').modal('hide');
        };

        $scope.saveHomePage = function() {
            var data = {
                url: './saveHomePage',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: jQuery("#homepageform").serialize(),
                cache: false
            };
            CommonService.postFormData(data).then(function(responsedata) {
                if (!responsedata.validate) {
                    $scope.notifyBox('<i class="fa fa-times" aria-hidden="true"></i> Please correct the data', 'warning');
                    angular.forEach(responsedata.errors, function(value, key) {
                        //$('#' + key).parent().addClass('has-error');
                        //$('#' + key).parent().append(value);
                    });
                } else {
                    $scope.notifyBox('<i class="fa fa-check" aria-hidden="true"></i> Saved successfully', 'success');
                    $state.go('homepage', {reload: true});
                    //$state.go('^.recentcasedetails', {caseId: responsedata.caseid}, {reload: 'recentcasedetails', location: false});
                }
            });
        };

        if ($state.current.name === "successstories" || $state.current.name === "news") {

            $scope.columnLayout = [
                {
                    "title": "Header",
                    "data": "main_heading",
                    "width": "40%"
                },
                {
                    "title": "user",
                    "data": "user",
                    "width": "10%"
                },
                {
                    "title": "Created Date",
                    "data": "created_date",
                    "width": "15%"
                },
                {
                    "title": "Posted Date",
                    "data": "posted_date",
                    "width": "15%"
                },
                {
                    "title": "Status",
                    "data": "posted",
                    "width": "10%"
                },
                {
                    "title": "Actions",
                    "data": "id"
                }
            ];

            $scope.datatable = $("#datatable").on('preXhr.dt', function(e, settings) {
                //showLoader();
            }).on('xhr.dt', function(e, settings, json, xhr) {
                //hideLoader();
            }).on('error.dt', function(e, settings, techNote, message) {
                console.info('An error has been reported by DataTables: ' + message);
                //handleDataTableErrors();
            }).DataTable({
                "ajax": {
                    "url": "./getCampusPostJSON/" + $("#posttype").val(),
                    "dataSrc": ""
                },
                "deferRender": true,
                "autoWidth": false,
                "rowId": "id",
                "lengthMenu": [[5, 10, 20, 50, 100], [5, 10, 20, 50, 100]],
                "pageLength": 20,
                "pagingType": "full_numbers",
                "language": {
                    "info": '<span class="badge badge-info">_START_ - _END_</span> of <span class="badge badge-info">_TOTAL_</span> records',
                    "infoEmpty": '<span class="badge badge-info">0 - 0</span> of <span class="badge badge-info">0</span> records',
                    "emptyTable": "No Posts found",
                    "lengthMenu": "Display _MENU_ records per page",
                    "paginate": {
                        "first": '<i class="ace-icon fa fa-angle-double-left"></i>',
                        "last": '<i class="ace-icon fa fa-angle-double-right"></i>',
                        "next": '<i class="ace-icon fa fa-angle-right"></i>',
                        "previous": '<i class="ace-icon fa fa-angle-left"></i>'
                    }
                },
                "columns": $scope.columnLayout,
                "initComplete": function(settings, json) {
                    //hideLoader();

                }
            });

            $scope.getpost = function(type, id) {
                jQuery.ajax({
                    url: './getCampusPost/' + type + '/' + id,
                    type: 'POST',
                    success: function(response) {
                        $('#editpostform').html(response);
                    },
                    error: function(jqXhr, statusTxt) {
                    },
                    //dataType: 'json',
                    async: false,
                    cache: false
                });
            };
        }

        //post details
        if ($state.current.name === "storydetails"
                || $state.current.name === "newsdetails"
                || $state.current.name === "dataprotection") {
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
        }

        if ($state.current.name === "dataprotection") {
            $('#content').summernote({
                height: 400,
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

            $scope.saveDataProtectionPage = function() {
                var data = {
                    url: './saveDataProtection',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: jQuery("#DataProtectionForm").serialize(),
                    cache: false
                };
                CommonService.postFormData(data).then(function(responsedata) {
                    if (!responsedata.validate) {
                        $scope.notifyBox('<i class="fa fa-times" aria-hidden="true"></i> Please correct the data', 'warning');
                        angular.forEach(responsedata.errors, function(value, key) {
                            //$('#' + key).parent().addClass('has-error');
                            //$('#' + key).parent().append(value);
                        });
                    } else {
                        $scope.notifyBox('<i class="fa fa-check" aria-hidden="true"></i> Saved successfully', 'success');
                        $state.go('dataprotection', {reload: true});
                        //$state.go('^.recentcasedetails', {caseId: responsedata.caseid}, {reload: 'recentcasedetails', location: false});
                    }
                });
            };
        }

        if ($state.current.name === "globalclients") {
            var datajson = {
                url: './globalclientsjson',
                method: 'GET',
                cache: false
            };
            $scope.getAllClients = function() {
                CommonService.getListData(datajson).then(function(responsedata) {
                    $scope.clientsData = responsedata;
                });
            };
            $scope.getAllClients();
            $scope.saveGlobalClientsPage = function() {
                var data = {
                    url: './saveGlobalClients',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: jQuery("#globalclentsform").serialize(),
                    cache: false
                };
                CommonService.postFormData(data).then(function(responsedata) {
                    if (!responsedata.validate) {
                        $scope.notifyBox('<i class="fa fa-times" aria-hidden="true"></i> Please correct the data', 'warning');
                        angular.forEach(responsedata.errors, function(value, key) {
                            //$('#' + key).parent().addClass('has-error');
                            //$('#' + key).parent().append(value);
                        });
                    } else {
                        jQuery("#globalclentsform").reset();
                        $("#selectedimages").empty();
                        $scope.notifyBox('<i class="fa fa-check" aria-hidden="true"></i> Saved successfully', 'success');
                        $scope.getAllClients();
                        //$state.go('dataprotection', {reload: true});
                        //$state.go('^.recentcasedetails', {caseId: responsedata.caseid}, {reload: 'recentcasedetails', location: false});
                    }
                });
            };
        }
    }
]);

app.factory('CommonService', ['$q', '$http', function($q, $http) {

        return {
            getListData: function(data) {
                var promise = $http(data).then(function(response) {
                    return response.data;
                });
                return promise;
            },
            postFormData: function(data) {   
                var promise = $http(data).then(function(response) {
                    return response.data;
                });
                return promise;
            }
        };
    }]);

