<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends MY_Controller {

    private $data;

    public function __construct() {
        parent::__construct();
        $this->data = array();
        $this->load->library('services');
    }

    public function index() {
        $this->data["title"] = "Campus";
        $this->data['links'] = $this->services->getHomeLinks();
        $this->data["factive"] = 1;
        $this->data["mactive"] = 1;
        $this->data["bodyclass"] = "";
        $this->data['successStories'] = $this->services->get_posts("SUCCESS");
        //var_dump($this->services->get_posts("SUCCESS"));
        $this->data['newsPosts'] = $this->services->get_posts("NEWS");
        $this->load->view('pages/home', $this->data);
    }

    public function getSecureCode() {
        
    }

}
