<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>MedicoLegal | Log in</title>
        <!-- Tell the browser to be responsive to screen width -->
        <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
        <!-- Bootstrap 3.3.6 -->
        <link href="<?php echo base_url() ?>assets/css/bootstrap/css/bootstrap.min.css" rel="stylesheet">
        <link href="<?php echo base_url() ?>assets/css/bootstrap/toggle/bootstrap-toggle.css" rel="stylesheet">
        <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,700,800,600' rel='stylesheet' type='text/css'>
        <link href='https://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet' type='text/css'>

        <!-- Font Awesome -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css">
        <!-- Ionicons -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css">
        <!-- Theme style -->
        <link rel="stylesheet" href="<?php echo base_url() ?>dashboard/theme/css/AdminLTE.min.css">
        <link href="<?php echo base_url() ?>dashboard/app/stylesheets/src/style.compiled.css?version=3.22.1" rel="stylesheet">
        <!--     iCheck 
            <link rel="stylesheet" href="../../plugins/iCheck/square/blue.css">-->

        <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->
    </head>
    <body class="hold-transition login-page">
        <div class="login-box">
            <div class="login-logo">
                <p><b>Campus</b><span>Card</span></p>
            </div>
            <!-- /.login-logo -->
            <div class="login-box-body">
                <p class="login-box-msg">Sign in to start your session</p>
                <div class="clearfix">
                    <?php
                    $val_errors = validation_errors();
                    if (!empty($val_errors) || !empty($errors)) {
                        ?>

                        <div class="alert alert-danger" role="alert">
                            <?php
                            echo $errors;
                            echo validation_errors();
                            ?>
                        </div>
                    <?php }
                    ?>
                </div>
                <form action="<?php echo base_url(); ?>dashboardlogin/authenticate" method="post" id="login_form" name="login_form">
                    <div class="form-group has-feedback">
                        <input type="text" class="form-control" name="username" placeholder="User Name" value="<?php echo set_value('username'); ?>">
                        <span class="glyphicon glyphicon-user form-control-feedback"></span>
                    </div>
                    <div class="form-group has-feedback">
                        <input type="password" class="form-control" name="password" placeholder="Password" value="<?php echo set_value('password'); ?>">
                        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
                    </div>
                    <div class="row">
                        <div class="col-xs-8">
                            <div class="form-group rcheck">
                                <input type="checkbox" id="check3"/><label for="check3">Remember me</label>
                            </div>
                        </div>
                        <!-- /.col -->
                        <div class="col-xs-4">
                            <button type="submit" class="btn btn-primary btn-block btn-flat">Sign In</button>
                        </div>
                        <!-- /.col -->
                    </div>
                </form>

                <!--        <div class="social-auth-links text-center">
                          <p>- OR -</p>
                          <a href="#" class="btn btn-block btn-social btn-facebook btn-flat"><i class="fa fa-facebook"></i> Sign in using
                            Facebook</a>
                          <a href="#" class="btn btn-block btn-social btn-google btn-flat"><i class="fa fa-google-plus"></i> Sign in using
                            Google+</a>
                        </div>
                         /.social-auth-links 
                
                        <a href="#">I forgot my password</a><br>
                        <a href="register.html" class="text-center">Register a new membership</a>-->

            </div>
            <!-- /.login-box-body -->
        </div>
        <!-- /.login-box -->

        <!-- jQuery 2.2.0 -->
        <script src="<?php echo base_url() ?>assets/js/jquery/jQuery-2.2.0.min.js"></script> 
        <!-- Bootstrap 3.3.6 -->
        <script src="<?php echo base_url() ?>assets/js/bootstrap/bootstrap.min.js"></script>
        <!--     iCheck 
            <script src="../../plugins/iCheck/icheck.min.js"></script>
            <script>
              $(function() {
                $('input').iCheck({
                  checkboxClass: 'icheckbox_square-blue',
                  radioClass: 'iradio_square-blue',
                  increaseArea: '20%' // optional
                });
              });
            </script>-->

        <script>
            $(function() {
                var url = location.href;
                if(url.indexOf('dashboardlogin') < 0) {
                    location.href = "<?php echo base_url('dashboardlogin')?>";
                }
            });
        </script>

        }
    </body>
</html>
