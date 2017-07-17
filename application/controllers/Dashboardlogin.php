<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Dashboardlogin extends CI_Controller {

    private $data;

    public function __construct() {
        parent::__construct();
        $this->data = array();
        $this->load->library('form_validation');
        $this->load->model('CommonDAO', 'dao');
    }

    public function index() {
        $this->load->view('dashboard/login', $this->data);
    }

    public function authenticate() {
        $this->validateinputs();
        $this->data['errors'] = '';

        if ($this->form_validation->run() === TRUE) {
            $username = $this->input->post('username');
            $password = $this->input->post('password');
            $user = $this->dao->get_record_by_upper('users', array("userid" => $username));

            if (isset($user) && count($user) &&
                    $user['is_active'] == 1 && password_verify($password, $user['password'])) {
                $this->session->set_userdata('docid', $user['id']);
                $this->session->set_userdata('userid', $user['userid']);
                $this->session->set_userdata('username', $user['name']);
                $this->session->set_userdata('isadmin', $user['role'] == 1 ? TRUE : FALSE);
                $this->session->set_userdata('valid', TRUE);
                redirect('admindashboard/#');
            } else {
                $this->data['errors'] = 'Invalid username or password!';
            }
        }
        $this->index();
    }

    private function validateinputs() {
        $this->load->library('form_validation');
        $this->form_validation->set_rules('username', 'User Name', 'trim|required');
        $this->form_validation->set_rules('password', 'Password', 'trim|required');
    }

    public function session_time_out() {
        $this->load->view('dashboard/session_time_out');
    }

    public function logout() {
        $data = array();
        $this->session->set_userdata($data);
        $this->session->sess_destroy();
        redirect('/dashboardlogin', 'refresh');
    }

}
