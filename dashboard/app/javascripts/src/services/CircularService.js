app.factory('CircularService', ['$http', function($http) {

        return {
            getCircularListData: function() {
                var promise = $http.get('get_circulars_list').then(function(response) {

                    return response.data;
                });
                return promise;
            }
        };
    }]);
