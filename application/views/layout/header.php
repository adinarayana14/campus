<div id="st-preloader">
    <div id="pre-status">
    </div>
</div>
<!-- Navigation -->
<nav class="navbar navbar-fixed-top bg-primary <?php echo empty($bodyclass) ? "navbar-transparent" : ""?> " <?php echo empty($bodyclass) ? "color-on-scroll=\"400\"" : ""?>>
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#info-navbar" aria-expanded="false" aria-controls="info-navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="<?php echo base_url()?>">
                <img src="<?php echo base_url('assets/images/logo.svg')?>" alt="Logo"/>
            </a>
        </div>
        <div id="info-navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav navbar-right">
                <li class="<?php echo $mactive == 1 ? "active" : ""; ?>"><a href="<?php echo $links['HM']?>" class="text-uppercase">Home</a></li>
                <li class="<?php echo $mactive == 2 ? "active" : ""; ?>"><a href="<?php echo $links['PD']?>" class="text-uppercase">Products</a></li>
                <li class="<?php echo $mactive == 3 ? "active" : ""; ?>"><a href="<?php echo $links['SS']?>" class="text-uppercase">Success Stories</a></li>
                <li class="<?php echo $mactive == 4 ? "active" : ""; ?>"><a href="<?php echo $links['NW']?>" class="text-uppercase">News</a></li>                
                <li class="<?php echo $mactive == 5 ? "active" : ""; ?>"><a href="<?php echo $links['CU']?>" class="text-uppercase">Contact Us</a></li>
            </ul>
        </div>
    </div>
</nav>
<!-- /Navigation-->