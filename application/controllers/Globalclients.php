<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Globalclients extends MY_Controller {

    private $data;

    public function __construct() {
        parent::__construct();
        $this->data = array();
        $this->load->library('services');
    }

    public function index() {
        $this->data["title"] = "Campus | Global Clients";
        $this->data["factive"] = 4;
        $this->data["mactive"] = 0;
        $this->data["bodyclass"] = "normal-page";
        $this->data['links'] = $this->services->getOtherPageLinks();
        $this->load->view('pages/global_glients', $this->data);
    }

}
