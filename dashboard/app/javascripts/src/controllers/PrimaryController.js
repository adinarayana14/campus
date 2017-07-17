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
