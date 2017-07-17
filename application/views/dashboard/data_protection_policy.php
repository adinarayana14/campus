
<!-- Main content -->
<section class="content">
    <form id="DataProtectionForm" name="DataProtectionForm" ng-submit="saveDataProtectionPage()">
        <div class="box box-danger">
            <div class="box-header box-header-big with-border">
                <h3 class="box-title">Personal Data Protection Policy</h3>
                <div class="pull-right">
                    <button type="submit" class="btn btn-success"><i class="fa fa-check"></i> Save</button>
                </div>
            </div>
            <div class="box-body">
                <div class="row">
                    <div class="col-lg-10">
                        <!-- <div class="form-group">
                                <label for="heading">Heading</label>
                                <input type="text" class="form-control" id="heading" name="heading" autocomplete="off" value="">
                            </div>-->
                        <div class="form-group">
                            <label for="title">Content</label>
                            <textarea class="form-control" id="content" name="content" autocomplete="off" ><?php echo $record['content']?></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
</section>