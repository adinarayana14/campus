<div class="modal fade" id="imageSelectModal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="myLargeModalLabel">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Select the Image</h4>
            </div>
            <div class="modal-body image-select-container">
                <div class="row">
                    <!--<div ng-repeat="image in imageList" class="col-sm-2">
                        <input class="img-radio" id="img{{image.id}}" type="radio" name="img" ng-checked="image.id == <?php echo $record['image_id']; ?>" value="{{image.id}}" ng-click="selectImage()">
                        <label for="img{{image.id}}" class="img-label">                            
                            <img src="<?php echo base_url() ?>{{image.image_path + '/' + image.image_thumb}}" alt=""/>
                        </label>
                    </div>-->
                    <div ng-repeat="image in mediaFiles" class="col-sm-2" ng-if="image.type.indexOf('image') !== -1">
                        <input class="img-radio" id="img{{image.id}}" type="radio" name="img" value="{{image.id}}" ng-click="selectImage()">
                        <label for="img{{image.id}}" class="img-label">                            
                            <div ng-if="image.type.indexOf('image') !== -1" style="background-image: url('<?php echo base_url() ?>{{image.m_path + '/' + image.m_name}}'); height: 130px; background-repeat: no-repeat; background-size: auto 100%; background-position: center center"></div>
                            <div ng-if="image.type.indexOf('image') === -1" style="background-image: url('<?php echo base_url('assets/images/file.png') ?>'); height: 130px; background-repeat: no-repeat; background-size: auto 100%; background-position: center center; position: relative">
                                <div style="position: absolute; bottom: 0; left: 0; right: 0; color: #FFF; padding: 3px 2px" class="text-center bg-gray-active">
                                    {{image.m_name}}
                                </div>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
