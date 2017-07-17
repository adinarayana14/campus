<section class="content">
    <div class="box box-danger">
        <div class="box-header box-header-big with-border">
            <h3 class="box-title">Global Clients</h3>
        </div>
        <div class="box-body">
            <div class="clearfix" style="padding: 30px; border: 2px dashed #f3f3f3; margin-bottom: 30px">
                <form class="form-inline" name="globalclentsform" id="globalclentsform" ng-submit="saveGlobalClientsPage()">
                    <div class="form-group">
                        <label class="sr-only" for="description">Description</label>
                        <input type="text" class="form-control" id="description" name="description" placeholder="Description">
                    </div>
                    <div class="form-group">
                        <label class="sr-only">Add Image</label>
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#imageSelectModal" data-backdrop="static" ng-click="getImages()">Add Image</button>
                    </div>
                    <input type="hidden" id="imageid" name="imageid" value=""/>
                    <div class="form-group">
                        <button class="btn btn-success">Save</button>
                    </div>
                    <div class="form-group">
                        <div id="selectedimages" style="width: 150px">
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <?php $this->load->view("dashboard/layout/image_selecter"); ?>
</section>