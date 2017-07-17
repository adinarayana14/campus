<?php

defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Description of Admidashboard
 *
 * @author adinarayana.idamakan
 */
class Admindashboard extends CI_Controller {

    private $data;
    private $selectQuery;

    public function __construct() {
        parent::__construct();
        $this->data = array();
        $valid = $this->session->userdata('valid');
        if (empty($valid) || !$valid == TRUE) {
            $data = array();
            $this->session->set_userdata($data);
            $this->session->sess_destroy();
            redirect('/dashboardlogin');
        }
        $this->load->model('CommonDAO', 'dao');
    }

    public function index() {
        $this->load->view('dashboard/dashboard', $this->data);
    }

    public function home() {
        $this->load->view('dashboard/home', $this->data);
    }

    public function mediafiles() {
        $this->load->view('dashboard/media', $this->data);
    }

    public function mediafilesjson() {
        $data = $this->dao->get_limit_records("media_files", NULL, array("created_date" => "DESC"), NULL, NULL);
        echo json_encode($data);
    }

    public function uploadMedia() {
        $formdata = array();
        if (isset($_FILES['uploadfile'])) {
            $mimetype = $_FILES['uploadfile']['type'];
            //echo $mimetype;
            $folderName = strtolower("uploads/" . date('Y/F', time()));
            $folderPath = "./" . $folderName;
            if (!is_dir($folderPath)) {
                mkdir($folderPath, 0777, true);
            }
            $this->load->library('upload');
            $config['upload_path'] = $folderPath;
            $config['allowed_types'] = '*';
            $config['max_size'] = '5048';
            //$config['encrypt_name'] = TRUE;

            $this->upload->initialize($config);
            if (!$this->upload->do_upload('uploadfile')) {
                $error = $this->upload->display_errors("", "");
                $this->data['status'] = 'error';
                $this->data['message'] = $error;
            } else {
                $data = $this->upload->data();
                $formdata['m_name'] = $data['file_name'];
                $formdata['m_path'] = $folderName;
                //$formdata['m_type'] = $data['file_type'];
                $formdata['type'] = $mimetype;
                $title = str_replace("_", " ", $data['raw_name']);
                $formdata['title'] = str_replace("-", " ", $title);
                $formdata['user'] = $this->session->userdata('userid');
                $formdata["location"] = $this->input->ip_address();
                //$savedName = $data['file_name'];
                $this->data['status'] = 'success';
                $this->data['message'] = "Uploaded Successfully!";
                $this->dao->save_record("media_files", $formdata);
            }
            echo json_encode($this->data);
        }
    }

    public function getimagedetails($id) {
        $this->data['media'] = $this->dao->get_record('media_files', $id);
        //var_dump($this->dao->get_record('media_files', $id));
        $this->load->view('dashboard/file_editor', $this->data);
    }

    public function updateMedia() {
        $formdata['title'] = $this->input->post('title');
        $formdata['alt_txt'] = $this->input->post('alttext');
        $id = $this->input->post('id');
        $this->dao->save_or_update_record('media_files', $formdata, $id);
        $this->data['status'] = 'success';
        $this->data['message'] = "Uploaded Successfully!";
        echo json_encode($this->data);
    }

    public function gethomepage() {
        $record = $this->dao->get_records_by_join_type($this->selectQuery, "home_page hp", array("media_files mf" => "mf.id = hp.image_id"), "LEFT OUTER", array("hp.id" => 1), NULL, FALSE, NULL, NULL);
        //var_dump($record);
        $this->data['record'] = $record[0];
        $this->load->view('dashboard/home_page', $this->data);
    }

    public function saveHomepage() {
        $formdata = array();
        $validate = TRUE;
        $formValidateJson = array();
        $formdata['header'] = $this->input->post('heading');
        $formdata['h_title'] = $this->input->post('title');
        $imageid = $this->input->post('imageid');
        if (!empty($imageid)) {
            $formdata['image_id'] = $this->input->post('imageid');
        }
        $formdata['user'] = $this->session->userdata('userid');
        $formdata["location"] = $this->input->ip_address();
        $this->dao->save_or_update_record("home_page", $formdata, 1);
        $formValidateJson['validate'] = $validate;
        echo json_encode($formValidateJson);
    }

    public function getSuccessStories() {
        $this->load->view('dashboard/success_stories', $this->data);
    }

    public function getNews() {
        $this->load->view('dashboard/all_news', $this->data);
    }

    public function getCampusPostJSON($postType) {
        $data = $this->dao->get_records_by_join_type($this->selectQuery, "campus_post rc", array("media_files ui" => "ui.id = rc.image_id"), "LEFT OUTER", NULL, array("rc.created_date" => "DESC", "post_type" => $postType), FALSE, NULL, NULL);
        foreach ($data as $key => $value) {
            //var_dump($value);
            $value['created_date'] = date('d-m-Y H:i', strtotime($value['created_date']));
            //echo $value['created_date'];
            if (isset($value['posted_date']) && !empty($value['posted_date'])) {
                $value['posted_date'] = date('d-m-Y H:i', strtotime($value['posted_date']));
            }
            if ($value['posted'] == '0') {
                $value['color'] = 'red';
            } else {
                $value['color'] = 'green';
            }
            $data[$key] = $value;
        }
        //$data = array();
        echo json_encode($data);
    }

    public function getCampusPost($type, $id) {
        $data = $this->dao->get_records_by_join_type($this->selectQuery, "campus_post rc", array("media_files ui" => "ui.id = rc.image_id"), "LEFT OUTER", array("rc.id" => $id), NULL, FALSE, NULL, NULL);
        //var_dump($data);
        if (empty($data)) {
            $data = array('main_heading' => '', 'description' => '', 'm_name' => '',
                'm_path' => '', 'image_id' => '', 'posted' => '', 'post_type' => $type);
        }
        $this->data['record'] = $id == 0 ? $data : $data[0];
        $this->data['posttype'] = $type;
        $this->load->view('dashboard/post_details', $this->data);
    }

    public function globalClients() {
        $this->load->view('dashboard/all_global_clients', $this->data);
    }
    
    public function globalclientsjson() {
        $data = $this->dao->get_records_by_join_type($this->selectQuery, "global_clients rc", array("media_files ui" => "ui.id = rc.image_id"), "LEFT OUTER", NULL, array("rc.global_clients" => "ASC"), FALSE, NULL, NULL);
        //$data = array();
        echo json_encode($data);
    }
    public function saveGlobalClients() {
        $formdata = array();
        $validate = TRUE;
        $formValidateJson = array();
        $formdata['description'] = $this->input->post('description');
        $imageid = $this->input->post('imageid');
        if (!empty($imageid)) {
            $formdata['image_id'] = $this->input->post('imageid');
        }
        $formdata['user'] = $this->session->userdata('userid');
        $formdata["location"] = $this->input->ip_address();
        $formdata["updated_date"] = date('Y-m-d H:i:s', time());
        $this->dao->save_or_update_record("home_page", $formdata, 1);
        $formValidateJson['validate'] = $validate;
        echo json_encode($formValidateJson);
    }

    public function dataprotection() {
        $this->data['record'] = $this->dao->get_record('dataprotection', 1);
        $this->load->view('dashboard/data_protection_policy', $this->data);
    }
    
    public function saveDataProtection() {
        $formdata = array();
        $validate = TRUE;
        $formValidateJson = array();
        //$formdata['header'] = $this->input->post('heading');
        $formdata['content'] = $this->input->post('content');        
        $formdata['user'] = $this->session->userdata('userid');
        $formdata["location"] = $this->input->ip_address();
        $formdata["updated_date"] = date('Y-m-d H:i:s', time());
        $this->dao->save_or_update_record("dataprotection", $formdata, 1);
        $formValidateJson['validate'] = $validate;
        echo json_encode($formValidateJson);
    }

}
