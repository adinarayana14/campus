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

