
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
