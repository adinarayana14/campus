<section class="content">
    <div class="box box-default">
        <div class="box-header box-header-big with-border">
            <h3 class="box-title"><i class="fa fa-file"></i> &nbsp;Media Files</h3>
        </div>
        <div class="box-body">
            <div class="" style="padding: 40px 40px 30px; border: 2px dashed #f3f3f3; margin-bottom: 30px">
                <form name="uploadmediaform" id="uploadmediaform" enctype="multipart/form-data">
                    <div class="form-group">
                        <input type="file" name="uploadfile">
                    </div>

                    <div class="form-group">
                        <button class="btn btn-success">Upload</button>
                    </div>
                </form>
            </div>

            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">Uploaded Files</h3>
                </div>
                <div class="panel-body image-select-container">
                    <div class="row">
                        <div ng-repeat="image in mediaFiles" class="col-sm-2">
                            <a ng-click="getIamgeDetails(image.id);" href="" data-toggle="modal" data-target="#mediaSelectModal" data-backdrop="static">
                                <div ng-if="image.type.indexOf('image') !== -1" style="background-image: url('<?php echo base_url() ?>{{image.m_path + '/' + image.m_name}}'); height: 130px; background-repeat: no-repeat; background-size: auto 100%; background-position: center center"></div>
                                <div ng-if="image.type.indexOf('image') === -1" style="background-image: url('<?php echo base_url('assets/images/file.png') ?>'); height: 130px; background-repeat: no-repeat; background-size: auto 100%; background-position: center center; position: relative">
                                    <div style="position: absolute; bottom: 0; left: 0; right: 0; color: #FFF; padding: 3px 2px" class="text-center bg-gray-active">
                                        {{image.m_name}}
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php $this->load->view("dashboard/layout/media_view_pop_up"); ?>
</section>

