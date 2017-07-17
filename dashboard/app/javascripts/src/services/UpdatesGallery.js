app.factory('UpdatesGallery', ['$http', function($http) {

        return {
            getUpdatesGalleryListData: function() {
                var promise = $http.get('dashboard/get-updates-gallery-list').then(function(response) { 
                    return response.data;
                });
                return promise;
            },
            
            getSildeShowListData: function() {
                var promise = $http.get('dashboard/slideshow-list-json').then(function(response) {

                    return response.data;
                });
                return promise;
            },
            
            getSildeShowListDetails: function(title) {
                var promise = $http.get('dashboard/slideshow-image-list/' + title).then(function(response) {

                    return response.data;
                });
                return promise;
            },
            
            getGalleryListJson: function(galid) {
                var promise = $http.get('dashboard/gallery-image-list/' + galid).then(function(response) {
                    return response.data;
                });
                return promise;
            },
            getGalleryListCountJson: function() {
                var promise = $http.get('dashboard/gallery-list-json').then(function(response) {
                    return response.data;
                });
                return promise;
            },
            getAdmissionsData: function() {
                var promise = $http.get('dashboard/admissions-home-json').then(function(response) {
                    return response.data;
                });
                return promise;
            }

        };

    }]);
