<!DOCTYPE html>
<html ng-app="CampusApp" ng-controller="PrimaryController">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Admin Dashboard</title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <!-- Bootstrap 3.3.6 -->
    <link href="<?php echo base_url() ?>assets/css/bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,700,800,600' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet' type='text/css'>
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css">
    <!-- Ionicons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css">
     <!-- Select2 -->
    <link rel="stylesheet" href="<?php echo base_url() ?>dashboard/theme/js/select2/select2.min.css">
    
    <link rel="stylesheet" href="<?php echo base_url() ?>dashboard/theme/js/datatables/dataTables.bootstrap.css">
    <!-- Theme style -->
    <link rel="stylesheet" href="<?php echo base_url() ?>dashboard/theme/css/AdminLTE.min.css">
    <!-- AdminLTE Skins. Choose a skin from the css/skins
         folder instead of downloading all of them to reduce the load. -->
    <link rel="stylesheet" href="<?php echo base_url() ?>dashboard/theme/css/skins/_all-skins.min.css">
    <link href="<?php echo base_url() ?>dashboard/app/css/vender/loading-bar.min.css" rel="stylesheet">
    <link href="<?php echo base_url() ?>dashboard/app/css/vender/nga.min.css" rel="stylesheet">
    <link href="<?php echo base_url() ?>dashboard/app/css/vender/animate.css" rel="stylesheet">
    
    <link href="<?php echo base_url() ?>dashboard/app/stylesheets/src/style.compiled.css?version=3.28.1" rel="stylesheet">
    
    <!--<link href="<?php echo base_url() ?>dashboard/app/stylesheets/dist/style.min.css" rel="stylesheet">-->

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <!-- ADD THE CLASS fixed TO GET A FIXED HEADER AND SIDEBAR LAYOUT -->
  <!-- the fixed layout is not compatible with sidebar-mini -->
  <body class="sidebar-mini skin-blue wysihtml5-supported fixed">
    <!-- Site wrapper -->
    <div class="wrapper">

      <!--header --->
      <?php $this->load->view("dashboard/layout/header");?>
      <!--/.header --->
      <!-- =============================================== -->

      <!-- Left side column. contains the sidebar -->
      <?php $this->load->view("dashboard/layout/sidemenu");?>

      <!-- =============================================== -->

      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper">        
        <ui-view class=""></ui-view>
      </div>
      <!-- /.content-wrapper -->

      <!--footer-->
      <?php $this->load->view("dashboard/layout/footer")?>
      <!--/.footer-->

    </div>
    <!-- ./wrapper -->
    
    <!-- jQuery 2.2.0 -->
    <script src="<?php echo base_url() ?>assets/js/jquery/jQuery-2.2.0.min.js"></script> 
    <!-- Bootstrap 3.3.6 -->
    <script src="<?php echo base_url() ?>assets/js/bootstrap/bootstrap.min.js"></script>
    <!-- SlimScroll -->
    <script src="<?php echo base_url() ?>dashboard/theme/js/slimScroll/jquery.slimscroll.min.js"></script>
    <!-- FastClick -->
    <script src="<?php echo base_url() ?>dashboard/theme/js/fastclick/fastclick.js"></script>
       
    <!-- Bootbox -->
    <script src="<?php echo base_url() ?>dashboard/theme/js/bootbox/bootbox.min.js"></script>
    
        <!-- DataTables -->
    <script src="<?php echo base_url() ?>dashboard/theme/js/datatables/jquery.dataTables.min.js"></script>
    <script src="<?php echo base_url() ?>dashboard/theme/js/datatables/dataTables.bootstrap.min.js"></script>
    
    <!-- jQuery ajax form -->
    <script src="<?php echo base_url() ?>dashboard/theme/js/jquery.form.min.js"></script>
    
    <!-- jQuery file button -->
    <script src="<?php echo base_url() ?>dashboard/theme/js/bootstrap-filestyle.min.js"></script>
    
    <!-- AdminLTE App -->
    <script src="<?php echo base_url() ?>dashboard/theme/js/app.js"></script>
    
    <!--Angular Js-->    
    <script src="<?php echo base_url() ?>dashboard/app/javascripts/vender/angular/angular.min.js"></script>
    <script src="<?php echo base_url() ?>dashboard/app/javascripts/vender/angular/angular-animate.min.js"></script>
    <script src="<?php echo base_url() ?>dashboard/app/javascripts/vender/angular/angular-touch.js"></script>
    <script src="<?php echo base_url() ?>dashboard/app/javascripts/vender/angular/angular-cookies.min.js"></script>
    <script src="<?php echo base_url() ?>dashboard/app/javascripts/vender/angular/angular-base64.js"></script>
    <script src="<?php echo base_url() ?>dashboard/app/javascripts/vender/angular/angular-route.min.js"></script>
    <script src="<?php echo base_url() ?>dashboard/app/javascripts/vender/angular/angular-ui-router.min.js"></script>
    <script src="<?php echo base_url() ?>dashboard/app/javascripts/vender/angular/ocLazyLoad.min.js"></script>
    <script src="<?php echo base_url() ?>dashboard/app/javascripts/vender/angular/ui-bootstrap-tpls-1.3.3.min.js"></script>
    <script src="<?php echo base_url() ?>dashboard/app/javascripts/vender/charts/Chart.min.js"></script>
    <script src="<?php echo base_url() ?>dashboard/app/javascripts/vender/charts/angular-chart.min.js"></script>
    <script src="<?php echo base_url() ?>dashboard/app/javascripts/vender/loader/loading-bar.min.js"></script>
    <script src="<?php echo base_url() ?>assets/js/notify/bootstrap-notify.min.js"></script>
    
    <script src="<?php echo base_url() ?>dashboard/app/javascripts/src/app.concat.js?version=3.28.1"></script>
  </body>
</html>
