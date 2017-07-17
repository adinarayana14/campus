<div class="row">
    <div class="col-sm-6">
        <div class="clearfix text-center" style="padding: 40px 20px">
            <?php if (strpos($media['type'], "image") === FALSE) {?>
            <img src="<?php echo base_url('assets/images/file.png')?>" style="width: 100%">
            <?php } else {?>
            <img src="<?php echo base_url($media['m_path'] . '/' . $media['m_name']); ?>" style="width: 100%">
            <?php }?>
        </div>
    </div>
    <div class="col-sm-6">
        <div class="clearfix" style="background: rgba(245, 245, 245, 0.44); padding: 20px 30px">
            <div class="well well-sm">
                <p>Image type: <?php echo $media['type'];?></p>
                <p>Image type: <?php echo $media['m_name'];?></p>
            </div>
            <div class="form-group">
                <label class="control-label">File Path</label>
                <input class="form-control" type="text" name="filepath" readonly="true" value="<?php echo base_url($media['m_path'] . '/' . $media['m_name']); ?>">
                <input type="hidden" name="id" value="<?php echo $media['id']?>">
            </div>
            <div class="form-group">
                <label class="control-label">Title</label>
                <input class="form-control" type="text" name="title" value="<?php echo $media['title']; ?>">
            </div>
            <?php
            if (strpos($media['type'], "image") !== FALSE) {
                ?>
                <div class="form-group">
                    <label class="control-label">Alt Text</label>
                    <input class="form-control" type="text" name="alttext" value="<?php echo $media['alt_txt']; ?>">
                </div>
            <?php } ?>
            <div class="form-group">
                <button type="submit" class="btn btn-success">Save</button>
            </div>
        </div>

    </div>
</div>
