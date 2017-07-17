<div class="modal fade" id="cropImgModal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="myLargeModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <form class="form-horizontal">
                <div class="modal-header" style="position: relative">
                    <div class="crop-loader" id="croploader">
                        <div class="crop-loader-content"><i class="fa fa-spinner fa-spin"></i> &nbsp;Cropping image</div>
                    </div>
                    <div class="modal-title">
                        <button type="button" class="btn btn-danger" ng-click="closeModal()"><i class="fa fa-times"></i> Close</button>
                        <span class="btn btn-primary btn-file">
                            <i class="fa fa-folder-open"></i> Choose Image<input type="file" id="uploadfile" name="uploadfiles[]">
                        </span>
                        <button type="button" class="btn btn-success" ng-click="cropImage()"><i class="fa fa-crop"></i> Crop</button>
                        <!--<button type="button" class="btn btn-success" ng-click="finishCrop()" data-dismiss="modal"><i class="fa fa-thumbs-up"></i> Finish</button>-->
                    </div>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <div class="col-lg-12">
                            <div id="upload-demo"></div>
                        </div>
                    </div>
                </div>
<!--                <div class="modal-footer">
                    <div id="imgpreview" class="pull-left"></div>
                </div>-->
            </form>
        </div>
    </div>
</div>
