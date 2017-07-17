<!-- Main content -->
<section class="content uploadimages">
    <div class="box box-default">
        <div class="box-header box-header-big with-border">
            <h3 class="box-title"><i class="fa fa-file-image-o"></i> &nbsp;Uploaded Images</h3>
            <div class="pull-right">
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#multiCropImgModal" data-backdrop="static"><i class="fa fa-upload"></i>&nbsp; Upload more Images</button>
            </div>
        </div>
        <div class="box-body">
            <div class="gallery-list" id="gallery-list">
                <div ng-repeat="image in imageList" class="col-md-2 col-sm-4 col-xs-6">
                    <div class="thumbnail-content">
                        <div class="image-container" >
                            <div class="mask"></div>
                            <img class="member-img" src="<?php echo base_url() ?>{{image.image_path + '/' + image.image_thumb}}" alt=""/>
                            <div class="caption text-center">
                                <div class="middle">              
                                    <div class="view">
                                        <a class="img-link" href="<?php echo base_url() ?>{{image.image_path + '/' + image.image_name}}">
                                            <i class="fa fa-eye"></i>
                                        </a>
                                    </div>
                                    <div class="delete">
                                        <a href="{{image.id}}" class="imageremove">
                                            <i class="fa fa-trash"></i>
                                        </a>  
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <form name="uploadimagetempform" id="uploadimagetempform" method="POST">
      <input type="hidden" name="imagebase64" id="imagebase64"/>
    </form>
    <?php $this->load->view("dashboard/layout/multi_image_croper"); ?>
</section>
