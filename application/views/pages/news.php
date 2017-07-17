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
                        <h1 class="text-uppercase main-headers">News</h1>
                        <div class="row">
                            <div class="col-sm-8 content">
                                <h2><?php echo $post['header']; ?></h2>
                                <?php echo $post['content']; ?>
                            </div>
                            <div class="col-sm-4 side-content">
                                <div class="more-stories">
                                    <h3>More News</h3>
                                    <div class="row">
                                      <?php
                                      foreach ($posts as $post) {
                                        if ($postId != $post['id']) {
                                          ?>
                                            <div class="col-xs-12">
                                                <a href="<?php echo base_url('news/post/' . $post['urlid']) ?>">
                                                    <div class="post">
                                                        <h2><?php echo $post['header']; ?></h2>
                                                        <?php echo preg_replace('/\s+?(\S+)?$/', '', substr(strip_tags($post['content']), 0, 80)) . '...'; ?>
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

        <!-- footer-->
        
        <!-- /footer-->
        <script>

        </script>
    </body>
</html>
