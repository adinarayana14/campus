<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends MY_Controller {

    private $data;

    public function __construct() {
        parent::__construct();
        $this->data = array();
    }

    public function index() {
        $this->data["title"] = "Campus";
        $this->data["factive"] = 0;
        $this->data["mactive"] = 1;
        $this->load->view('pages/home', $this->data);
    }

}
