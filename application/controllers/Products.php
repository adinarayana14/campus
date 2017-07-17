<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Products extends MY_Controller {

    private $data;

    public function __construct() {
        parent::__construct();
        $this->data = array();
        $this->load->library('services');
    }

    public function index() {
        $this->data["title"] = "Campus | Products";
        $this->data["factive"] = 2;
        $this->data["mactive"] = 2;
        $this->data["bodyclass"] = "normal-page";
        $this->data['links'] = $this->services->getOtherPageLinks();
        $this->load->view('pages/products', $this->data);
    }

}
