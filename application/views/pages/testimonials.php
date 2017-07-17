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
                        <h1 class="text-uppercase main-headers">Testimonials</h1>
                        <div class="section section-testmonials">
                            <div class="row">
                                <div class="col-xs-12">
                                    <p>Read about what people have to say about CAMPUS and our SOLUTIONS.</p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 video">
                                    <div class="embed-responsive embed-responsive-16by9">
                                        <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/kecQRgxVG58" frameborder="0" allowfullscreen></iframe>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-6 content">
                                    <p class="heading">
                                        <b>Chad Bates</b><br>
                                        <i>Director</i><br>
                                        <span style="color: red">Information Technology – International School of Bangkok</span>
                                    </p>
                                    <p>With over 1,000 customers, queues at meal times were previously
                                        unavoidable in the school canteen. However, after adopting Campus
                                        Cards for our Student ID, students were able to quickly and easily
                                        purchase their meals with a quick tap of the Campus Card at the
                                        cashier. Campus has also helped us reduce our administration costs
                                        by eliminating cash from the canteen. Parents are able to add cash,
                                        limit usage and monitor purchases using the online web portal, all of
                                        which lead to educationally valuable conversations at home about
                                        diet and budgeting.</p>
                                </div>
                                <div class="col-sm-6 content">
                                    <p class="heading">
                                        <b>Mark Holland</b><br>
                                        <i>Director ITC</i><br>
                                        <span style="color: red">Australian International School Singapore</span>
                                    </p>
                                    <p>We found the Campus online ordering system to be a fantastic tool
                                        for parents to order and pay for meals from the canteen in advance.
                                        We also adopted and customised the Campus Card as our student
                                        identity card. Students use their Campus Cards instead of cash to
                                        make purchases at the uniform shop and canteen. Parents can view
                                        their children’s purchase history online to monitor spending habits.
                                        The Campus database integrates with our existing school
                                        administration database to update student records. There is minimal
                                        need for duplicate data entry in multiple databases.</p>
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
            $(document).ready(function () {
                $(".post").responsiveEqualHeightGrid();
            });
        </script>
    </body>
</html>
