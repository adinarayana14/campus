<!-- Main content -->
<section class="content">
    <form id="homepageform" name="homepageform" ng-submit="saveHomePage()">
        <div class="box box-danger">
            <div class="box-header box-header-big with-border">
                <h3 class="box-title">Home Page</h3>
                <div class="pull-right">
                    <button type="submit" class="btn btn-success"><i class="fa fa-check"></i> Save</button>
                </div>
            </div>
            <div class="box-body">
                <div class="row">
                    <div class="col-sm-8">
                        <div class="form-group">
                            <label for="heading">Heading</label>
                            <input type="text" class="form-control" id="heading" name="heading" autocomplete="off" value="<?php echo $record['header'] ?>">
                        </div>
                        <div class="form-group">
                            <label for="title">Title</label>
                            <textarea class="form-control" id="title" name="title" autocomplete="off" rows="5"><?php echo $record['h_title'] ?></textarea>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="addmediabutton">
                            <div id="selectedimages" style="margin-top: 20px">
                                <?php if (!empty($record['m_name'])) { ?>
                                    <img src="<?php echo base_url($record['m_path'] . '/' . $record['m_name']) ?>" style="width: 100%;"/>
                                <?php } ?>
                            </div>
                            <div class="form-group">
                                <label class="sr-only">Add Image</label>
                                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#imageSelectModal" data-backdrop="static" ng-click="getImages()">Add Image</button>
                            </div>
                            <input type="hidden" id="imageid" name="imageid" value="<?php echo $record['image_id']?>"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
    <?php $this->load->view("dashboard/layout/image_selecter"); ?>
</section>