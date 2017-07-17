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
                        <div class="content">
                            <div class="row">
                              <?php foreach ($posts as $post) { ?>
                                  <div class="col-sm-6">
                                      <div class="post <?php $post['id'] == $postId ? "active" : "" ?>">
                                          <h2><?php echo $post['header']; ?></h2>
                                          <?php echo $post['content']; ?>
                                      </div>
                                  </div>
                                <?php } ?>
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
            $(document).ready(function(){
                $(".post").responsiveEqualHeightGrid();
            });
        </script>
    </body>
</html>
