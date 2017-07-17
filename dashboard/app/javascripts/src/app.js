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

