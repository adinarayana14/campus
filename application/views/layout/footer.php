<?php
$capchaerror = "";
if (isset($_SESSION['captcha_error'])) {
    $capchaerror = $_SESSION['captcha_error'];
    unset($_SESSION['captcha_error']);
}
?>
<footer class="footer clearfix" id="contactus">
    <div class="menu-form clearfix">
        <div class="container">
            <div class="row">
                <div class="col-sm-4 content">
                    <div class="footer-menu">
                        <div class="row">
                            <div class="col-xs-12">
                                <a href="<?php echo $links['HM'] ?>" class="text-uppercase <?php echo $factive == 1 ? "active" : ""; ?>">Home</a>
                            </div>
                            <div class="col-xs-12">
                                <a href="<?php echo $links['PD'] ?>" class="text-uppercase <?php echo $factive == 2 ? "active" : ""; ?>">Products</a>
                            </div>
                            <div class="col-xs-12">
                                <a href="<?php echo $links['TM'] ?>" class="text-uppercase <?php echo $factive == 3 ? "active" : ""; ?>">Testimonials</a>
                            </div>
                            <div class="col-xs-12">
                                <a href="<?php echo $links['GL'] ?>" class="text-uppercase <?php echo $factive == 4 ? "active" : ""; ?>">Global Clients</a>
                            </div>
                            <div class="col-xs-12">
                                <a href="<?php echo $links['IG'] ?>" class="text-uppercase <?php echo $factive == 5 ? "active" : ""; ?>">Integrations</a>
                            </div>
                            <div class="col-xs-12">
                                <a href="<?php echo $links['AU'] ?>" class="text-uppercase <?php echo $factive == 6 ? "active" : ""; ?>">About Us</a>
                            </div>
                            <div class="col-xs-12">
                                <a href="<?php echo $links['SS'] ?>" class="text-uppercase <?php echo $factive == 7 ? "active" : ""; ?>">Success Stories</a>
                            </div>
                            <div class="col-xs-12">
                                <a href="<?php echo $links['NW'] ?>" class="text-uppercase <?php echo $factive == 8 ? "active" : ""; ?>">News</a>
                            </div>                                        
                            <div class="col-xs-12">
                                <a href="<?php echo $links['PP'] ?>" class="text-uppercase <?php echo $factive == 9 ? "active" : ""; ?>">Personal Data Protection Policy</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-8">
                    <div class="row">
                        <div class="col-sm-7 col-sm-push-5 content">
                            <div class="contact-form">
                                <h2 class="text-uppercase">Contact Us</h2>
                                <form name="contactusForm" method="POST" id="contactusForm" action="<?php echo base_url('enquiry') ?>">
                                    <div class="form-group">
                                        <label class="control-label sr-only">Your Name</label>
                                        <input type="text" class="form-control" autocomplete="off" name="name" placeholder="Your Name">
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label sr-only">Your Email</label>
                                        <input type="email" class="form-control" autocomplete="off" name="email" placeholder="Your Email">
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label sr-only">Message</label>
                                        <textarea class="form-control" rows="4"  name="message" placeholder="Message"></textarea>
                                    </div>
                                    <div class="form-group">
                                        <img src="<?php echo base_url("captchacode/code") . '/' . rand() ?>" id='captchaimg' style="margin-bottom: 10px">
                                        <input class="form-control" name="6_letters_code" type="text" autocomplete="off" id="formcaptcha" placeholder="Enter the code above here" maxlength="6"><br>
                                        <small style="color: #FFFFFF">Can't read the image? click <a href='javascript: refreshCaptcha();'>here</a> to refresh</small>
                                    </div>
                                    <div class="form-group">
                                        <button type="submit" id="submitbtn" class="btn btn-submit">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="col-sm-5 col-sm-pull-7 content social-wrap">
                            <div class="app-store">
                                <div>
                                    <i class="fa fa-3x fa-apple"></i>
                                    <p>iOS</p>
                                </div>
                                <div>
                                    <i class="fa fa-3x fa-android"></i>
                                    <p>Android</p>
                                </div>
                                <div>
                                    <i class="fa fa-3x fa-windows"></i>
                                    <p>Windows</p>
                                </div>
                            </div>
                            <!--<div class="social">
                                <a href="#" class=""><i class="fa fa-facebook"></i></a>
                                <a href="#" class=""><i class="fa fa-linkedin"></i></a>
                                <a href="#" class=""><i class="fa fa-twitter"></i></a>
                                <a href="#" class=""><i class="fa fa-youtube"></i></a>
                            </div>-->
                            <div class="clearfix address">
                                <p>
                                    46 East Coast Road,<br>
                                    #08-04, EastGate,<br>
                                    Singapore 428766<br>
                                    (65) 9722 4311<br>
                                    sales@mycampuscard.com
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="copyright-grid clearfix">
        <div class="container">
            <div class="row">
                <div class="col-sm-4 site">
                    <a href="//www.verticalpayments.com" target="_blank"><img src="<?php echo base_url('assets/images/vps_logo.svg') ?>">www.verticalpayments.com</a>
                </div>
                <div class="col-sm-8 copyright">
                    <p>&copy; Vertical Payment Solutions Pte Ltd (Singapore registration number 200808478M)</p>
                </div>
            </div>
        </div>
    </div>
</footer>
<div class="scroll-up">
    <ul><li><a href="#header"><i class="fa fa-angle-up"></i></a></li></ul>
</div>
<?php $this->load->view('layout/javascript'); ?>
<script type="text/javascript">
    function refreshCaptcha() {
        var img = document.images['captchaimg'];
        img.src = "<?php echo base_url("captchacode/code") ?>/" + Math.random() * 1000;
    }
    var validator = null;
    $(document).ready(function() {
        /*jQuery.validator.addMethod("captchacheck", function(value, element) {
         return value === "test";
         }, "Please specify the correct domain for your documents");*/

        validator = $("#contactusForm").validate({
            rules: {
                name: "required",
                email: "required",
                message: "required",
                "6_letters_code": {
                    required: true,
                    minlength: 6
                            //remote: "<?php echo base_url('captchacode/validCode') ?>"
                }
            },
            messages: {
                name: "Please enter your name",
                email: "Please enter your email",
                message: "Please enter the message",
                "6_letters_code": {
                    required: "Please enter the above 6 latters code",
                    minlength: "please enter all 6 latters"
                            //remote : "Please enter valid code"
                }
            },
            errorElement: "span",
            errorPlacement: function(error, element) {
                // Add the `help-block` class to the error element
                error.addClass("help-block");
                error.insertAfter(element);
            },
            highlight: function(element, errorClass, validClass) {
                $(element).closest('.form-group').addClass("has-error").removeClass("has-success");
            },
            unhighlight: function(element, errorClass, validClass) {
                $(element).closest('.form-group').addClass("has-success").removeClass("has-error");
            },
            submitHandler: function(form) {
                $("#submitbtn").html("submitting...").prop("disabled", true);
                form.submit();
            }
        });
        if ("<?php echo $capchaerror;?>" !== "") {
            $('.footer-menu a[href="#contactus"]').click();
            validator.showErrors({
                "6_letters_code": "please enter valid code"
            });
        }
    });
</script>