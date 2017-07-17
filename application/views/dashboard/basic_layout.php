<!-- Main content -->
<section class="content">
    <form id="recentcaseform" name="recentcaseform" ng-submit="saveRecentCase()">
        <div class="box box-danger">
            <div class="box-header box-header-big with-border">
                <h3 class="box-title"><i ng-class="{'fa fa-plus' : caseId === '0', 'fa fa-edit' : caseId !== '0'}"></i> {{ caseId == 0 ? " Add " : " Edit " }} Case</h3>
                <div class="pull-right">                
                    <button type="button" class="btn btn-primary" ng-click="postRecentCase()"><i class="fa fa-arrow-right"></i> Post</button>
                    <button type="submit" class="btn btn-success"><i class="fa fa-check"></i> Save</button>
                </div>
            </div>
            <div class="box-body">
                
            </div>
        </div>
    </form>
    <?php $this->load->view("dashboard/layout/image_selecter"); ?>
</section>

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
        </div>
    </div>
</section>

