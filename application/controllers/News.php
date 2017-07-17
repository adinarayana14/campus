<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class News extends MY_Controller {

    private $data;

    public function __construct() {
        parent::__construct();
        $this->data = array();
         $this->load->library('services');
    }

    public function index() {
       $data = $this->services->get_posts("NEWS");
       redirect('news/post/' . $data[0]['urlid']);
    }
    
    public function post($postId) {

        $this->data["title"] = "Campus | News";
        $this->data["factive"] = 8;
        $this->data["mactive"] = 4;
        $this->data["bodyclass"] = "normal-page";
        $this->data['links'] = $this->services->getOtherPageLinks();
        $postId = substr(strrchr($postId, "-"), 1);
        //echo $caseId;
        $post = $this->services->get_post($postId, 'NEWS');
        if (!isset($postId) || empty($postId) || empty($post)) {
            redirect('recent-cases');
            return;
        }
        $this->data["post"] = $post;
        $this->data["postId"] = $postId;
        $this->load->library('user_agent');
        $this->data["posts"] = $this->services->get_posts("NEWS");
        if ($this->agent->is_mobile()) {
            //$this->data["recentcases"] = $this->services->getRecentCases(0, 6);
        } else {
            //$this->data["recentcases"] = $this->services->getRecentCases(0, 8);
        }
        $this->load->view('pages/news', $this->data);
    }

}
