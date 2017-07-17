<!DOCTYPE html>
<html>
    <head> 
        <?php $this->load->view('layout/meta'); ?>
        <?php $this->load->view('layout/css_files'); ?>
    </head>
    <body class="normal-page">
        <!-- Static navbar -->
        <?php $this->load->view('layout/header'); ?>
        <!--// Static navbar -->

        <div class="wrapper">
            <div class="main clearfix">
                <div class="section stories">
                    <div class="container">
                        <h1 class="text-uppercase main-headers">Success Stories</h1>
                        <div class="row">
                            <div class="col-sm-8 content">
                                <?php if (!empty($post['image_name']) && isset($post['image_name'])) { ?>
                                    <div class="himage clearfix">
                                        <img src="<?php echo base_url($post['image_path'] . "/" . $post['image_name']) ?>">
                                    </div>                               
                                <?php } ?>
                                <h2><?php echo $post['header']; ?></h2>
                                <?php echo $post['content']; ?>
                            </div>
                            <div class="col-sm-4 side-content">
                                <div class="more-stories">
                                    <h3>More Success Stories</h3>
                                    <div class="row">
                                        <?php
                                        foreach ($posts as $post) {
                                            if ($postId != $post['id']) {
                                                ?>
                                                <div class="col-xs-12">
                                                    <a href="<?php echo base_url('SuccessStories/post/' . $post['urlid']) ?>">
                                                        <div class="post">
                                                            <div class="row">
                                                                <div class="col-xs-4">
                                                                    <img src="<?php echo base_url($post['image_path'] . "/" . $post['image_name']) ?>">
                                                                </div>
                                                                <div class="col-xs-8">
                                                                    <h2><?php echo $post['header']; ?></h2>
                                                                    <?php echo preg_replace('/\s+?(\S+)?$/', '', substr(strip_tags($post['content']), 0, 80)) . '...'; ?>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <?php
                                            }
                                        }
                                        ?>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <!-- footer-->
        <?php $this->load->view('layout/footer'); ?>
        <!-- /footer-->

    </body>
</html>
