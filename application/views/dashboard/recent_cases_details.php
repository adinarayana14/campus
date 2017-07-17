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
                <div class="form-wrapper clearfix">
                    <div class="form-group">
                        <label for="heading">Heading</label>
                        <input type="text" class="form-control" id="heading" name="heading" autocomplete="off" value="<?php echo $record['main_heading']?>">
                    </div>
                    <div class="form-group">
                        <label for="smalldescription">Small Description</label>
                        <input type="text" class="form-control" id="smalldescription" name="smalldescription" autocomplete="off" maxlength="250" value="<?php echo $record['sample_desc']?>">
                    </div>
                    <div class="form-group">
                        <label for="description">Description</label>
                        <textarea class="form-control" id="description" name="description"><?php echo $record['description']?></textarea>
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-xs-12">
                                <label class="sr-only">Upload Image</label>
                                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#imageSelectModal" data-backdrop="static">Add Image</button>
                            </div>
                            <div class="col-xs-4">
                                <div id="selectedimages" style="margin-top: 20px">
                                    <?php if(!empty($record['image_name'])) { ?>
                                    <img src="<?php echo base_url($record['image_path']. '/' .$record['image_thumb'])?>" style="width: 100%;"/>
                                    <?php }?>
                                </div>
                            </div>
                        </div>
                        <input type="hidden" id="imageid" name="imageid" value="<?php echo $record['image_id']?>"/>
                    </div>
                </div>
            </div>
        </div>
    </form>
    <?php $this->load->view("dashboard/layout/image_selecter"); ?>
</section>

