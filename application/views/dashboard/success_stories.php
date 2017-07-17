<section class="content recentcases">
    <div class="box box-default">
        <div class="box-header box-header-big with-border">
            <h3 class="box-title">Success Stories</h3>
            <div class="pull-right">
                <a ui-sref="storydetails({type:1, postId: 0})"  class="btn btn-primary">
                    <i class="fa fa-plus"></i>&nbsp; Add New
                </a>
                <!--<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#generalModal" data-backdrop="static" ng-click="getpost(1, 0)"><i class="fa fa-plus"></i>&nbsp; Add New</button>-->
            </div>
        </div>
        <div class="box-body">
            <table class="table table-striped" id="datatable">
                <thead>
                    <tr>
                        <td>Header</td>
                        <td>user</td>
                        <td>Created Date</td>
                        <td>Posted Date</td>
                        <td>Status</td>
                        <td>Actions</td>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
</section>
<input type="hidden" id="posttype" value="1">
