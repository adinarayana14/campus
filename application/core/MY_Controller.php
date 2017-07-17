<?php

/*
 * 
 */

/**
 * Description of MY_Controller
 *
 * @author adinarayana.i
 */
class MY_Controller extends CI_Controller {
    public function __construct() {
        parent::__construct();
        //session_start();
        //use if the site is in maintenance
        //redirect('pages/maintenance');
    }
}
