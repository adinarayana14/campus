<!-- Main content -->
<section class="content recentcases">
    <div class="box box-default">
        <div class="box-header box-header-big with-border">
            <h3 class="box-title"><i class="fa fa-globe"></i> &nbsp;Recent Case</h3>
            <div class="pull-right">
                <a ui-sref="recentcasedetails({caseId:0})"  class="btn btn-primary">
                    <i class="fa fa-plus"></i>&nbsp; Add New
                </a>
            </div>
        </div>
        <div class="box-body">
            <ul class="nav nav-stacked" ng-if="caseList.length > 0">
                <li ng-repeat="case in caseList">
                    <a ui-sref="recentcasedetails({caseId: case.id})" style="padding-left: 50px; border-left: 0">
                        <div class="row">
                            <div class="col-xs-12">
                                <h4>{{case.main_heading}}</h4>
                                <span style="font-size: 12px"><b>Posted: </b>{{case.posted_date}}, <b>Created: </b>{{case.created_date}} </span>
                            </div>
                        </div>
                        <div class="status" ng-class="{'bg-green' : case.color === 'green', 'bg-yellow' : case.color === 'red'}">
                            <i ng-class="{'fa fa-check' : case.color === 'green', 'fa fa-clock-o' : case.color === 'red'}"></i>
                        </div>
                    </a>
                    <a class="deletebtn" ng-click="deleteCase(case.id)">
                        <i class="fa fa-trash" aria-hidden="true"></i>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</section>
