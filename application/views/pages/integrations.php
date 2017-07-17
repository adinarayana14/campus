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
                        <h1 class="text-uppercase main-headers">Integrations</h1>
                        <div class="row content">
                            <div class="col-md-3 col-sm-4 client sameheight">
                                <img src="assets/images/integration/il1.png">
                            </div>
                            <div class="col-md-3 col-sm-4 client sameheight">
                                <img src="assets/images/integration/il2.png">
                            </div>
                            <div class="col-md-3 col-sm-4 client sameheight">
                                <img src="assets/images/integration/il3.png">
                            </div>
                            <div class="col-md-3 col-sm-4 client sameheight">
                                <img src="assets/images/integration/il4.png">
                            </div>
                            <div class="col-md-3 col-sm-4 client sameheight">
                                <img src="assets/images/integration/il5.png">
                            </div>
                            <div class="col-md-3 col-sm-4 client sameheight">
                                <img src="assets/images/integration/il6.png">
                            </div>
                            <div class="col-md-3 col-sm-4 client sameheight">
                                <img src="assets/images/integration/il7.png">
                            </div>
                            <div class="col-md-3 col-sm-4 client sameheight">
                                <img src="assets/images/integration/il8.png">
                            </div>
                        </div>
                        <p class="text-center">Contact us for customization requirements.</p>
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
                $(".sameheight").responsiveEqualHeightGrid();
            });
        </script>
    </body>
</html>
