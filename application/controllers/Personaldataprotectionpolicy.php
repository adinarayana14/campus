<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Personaldataprotectionpolicy extends MY_Controller {

    private $data;

    public function __construct() {
        parent::__construct();
        $this->data = array();
        $this->load->library('services');
    }

    public function index() {
        $this->data["title"] = "Campus | Personal Data Protection Policy";
        $this->data['links'] = $this->services->getOtherPageLinks();
        $this->data["factive"] = 9;
        $this->data["mactive"] = 0;
        $this->data["bodyclass"] = "normal-page";
        $this->load->view('pages/personal_data_protection_policy', $this->data);
    }

    public function getSecureCode() {
        
    }

}
