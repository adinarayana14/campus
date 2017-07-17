<?php

defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Description of Dashboard
 *
 * @author adinarayana.idamakan
 */
class Dashboard extends CI_Controller {

    private $data;
    private $selectQuery; 

    public function __construct() {
        parent::__construct();
        $this->data = array();
        //date_default_timezone_set('Asia/Kolkata');
        $valid = $this->session->userdata('valid');
        if (empty($valid) || !$valid == TRUE) {
            $data = array();
            $this->session->set_userdata($data);
            $this->session->sess_destroy();
            redirect('/dashboard-login');
        }
        $this->selectQuery = "rc.id as id, rc.main_heading, rc.sample_desc, rc.description, rc.image_id, rc.posted_date, rc.created_date, rc.user, rc.location, rc.posted, ui.image_name, ui.image_path, ui.image_thumb";
        $this->load->model('CommonDAO', 'dao');
    }

    public function index() {
        $this->load->view('dashboard/dashboard', $this->data);
    }

    public function home() {
        $this->load->view('dashboard/home', $this->data);
    }

    public function recent_cases() {
        $this->load->view('dashboard/recent_cases', $this->data);
    }

    public function recent_cases_json() {
        //$data = $this->dao->get_limit_records('recent_cases', NULL, array('id' => 'DESC'), NULL, NULL);
        $data = $this->dao->get_records_by_join_type($this->selectQuery, "recent_cases rc", array("upload_images ui" => "ui.id = rc.image_id"), "LEFT OUTER", NULL, array("rc.created_date"=>"DESC"), FALSE, NULL, NULL);
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

    public function recent_cases_details($id) {
        //$data = $this->dao->get_record('recent_cases', $id);
        $data = $this->dao->get_records_by_join_type($this->selectQuery, "recent_cases rc", array("upload_images ui" => "ui.id = rc.image_id"), "LEFT OUTER", array("rc.id" => $id), NULL, FALSE, NULL, NULL);
        if (empty($data)) {
            $data = array('main_heading' => '', 'sample_desc' => '', 'description' => '', 'image_name' => '',
                'image_path' => '', 'image_id' => '', 'posted' => '');
        }
        $this->data['record'] = $id == "0" ? $data : $data[0];
        $this->load->view('dashboard/recent_cases_details', $this->data);
    }

    public function uploadfiletemp() {
        $this->load->helper('file');
        $formdata = array();
        $imgbase64 = $this->input->post('imagebase64');
        if (isset($imgbase64)) {
            $imgbase64 = str_replace('data:image/png;base64,', '', $imgbase64);
            $imgbase64 = str_replace(' ', '+', $imgbase64);
            $basedata = base64_decode($imgbase64);
            $folderName = strtolower("uploads/temp");

            $folderPath = "./" . $folderName;
            if (!is_dir($folderPath)) {
                mkdir($folderPath, 0777, true);
            }
            $fileName = uniqid() . '.jpg';
            $file = $folderPath . '/' . $fileName;
            //echo $file;
            if (!write_file($file, $basedata)) {
                //echo 'Unable to write the file';
            } else {
                //echo 'File written!';
            }
            $formdata['file_name'] = $fileName;
            //$this->dao->save_record("file_upload", $formdata);
        }

        echo json_encode($formdata);
    }

    public function removetempimage() {
        $name = $this->input->post('fname');
        $data = array();
        $this->load->helper('file');
        $folderName = strtolower("uploads/temp");

        $folderPath = "./" . $folderName;
        $file = $folderPath . '/' . $name;
        //echo $file;
        if (!unlink($file)) {
            $data['message'] = "error";
        } else {
            $data['message'] = "success";
        }
        echo json_encode($data);
    }

    public function saveRecentCase($id) {
        $this->validateinputs();
        $fields = array('heading', 'smalldescription', 'description');
        $formErrors = array();
        $validate = TRUE;
        $formValidateJson = array();
        if ($this->form_validation->run() === FALSE) {
            $validate = FALSE;
            foreach ($fields as $value) {
                if (!empty(form_error($value))) {
                    $formErrors[$value] = form_error($value, '<i class="text-red">', '</i>');
                }
            }
        } else {
            $formdata = array();
            $formdata['main_heading'] = $this->input->post($fields[0]);
            $formdata['sample_desc'] = $this->input->post($fields[1]);
            $formdata['description'] = $this->input->post($fields[2]);
            $imageid = $this->input->post('imageid');
            if(!empty($imageid)) {
                $formdata['image_id'] = $this->input->post('imageid');
            }            
            $formdata['user'] = $this->session->userdata('userid');
            $formdata["location"] = $this->input->ip_address();
            $id = $this->dao->save_or_update_record("recent_cases", $formdata, $id);
        }
        $formValidateJson['validate'] = $validate;
        $formValidateJson['errors'] = $formErrors;
        $formValidateJson['caseid'] = $id;
        $formValidateJson['user'] = $this->session->userdata('userid');
        echo json_encode($formValidateJson);
    }

    public function postRecentCase($id) {
        if ($id != 0) {
            $formdata["posted"] = 1;
            $formdata["posted_date"] = date('Y-m-d H:i:s', time());
            $formdata['user'] = $this->session->userdata('userid');
            $id = $this->dao->save_or_update_record("recent_cases", $formdata, $id);
        }
    }

    public function delete_case() {
        $id = $this->input->post('caseId');
        $this->dao->delete_record("recent_cases", $id);
        echo '{"MESSAGE" : "SUCCESS"}';
    }

    private function validateinputs() {
        $this->load->library('form_validation');
        $this->form_validation->set_rules('heading', 'Heading', 'trim|required');
        $this->form_validation->set_rules('smalldescription', 'Small Description', 'trim|required');
        $this->form_validation->set_rules('description', 'Description', 'trim|required');
        //$this->form_validation->set_rules('imagecontent', 'Upload Image', 'trim|required');
        //$this->form_validation->set_rules('imageid', 'Upload Image', 'trim|required', array('required' => 'Please Add image to upload'));
    }

    public function upload_images() {
        //$this->upload_images_json();
        $this->load->view('dashboard/upload_images', $this->data);
    }
    
     public function upload_images_json() {
         $data = $this->dao->get_limit_records("upload_images", NULL, array("created_date" => "DESC"), NULL, NULL);
         echo json_encode($data);
     }

    public function upload_image() {

        $this->load->helper('file');
        $formData = array();
        $imgbase64 = $this->input->post('imagebase64');
        $pos = strpos($imgbase64, 'data:image/png;base64');
        if ($pos !== FALSE) {
            //upload image
            $imgbase64 = str_replace('data:image/png;base64,', '', $imgbase64);
            $imgbase64 = str_replace(' ', '+', $imgbase64);
            $basedata = base64_decode($imgbase64);
            $folderName = strtolower("uploads/recentcases/" . date('dmY'));

            $folderPath = "./" . $folderName;
            if (!is_dir($folderPath)) {
                mkdir($folderPath, 0777, true);
            }
            $fileName = uniqid() . '.jpg';
            $file = $folderPath . '/' . $fileName;
            //echo $file;
            if (!write_file($file, $basedata)) {
                //echo 'Unable to write the file';
            } else {
                //echo 'File written!';
            }
            $formData['image_name'] = $fileName;
            $formData['image_path'] = $folderName;
            $config['image_library'] = 'gd2';
            $config['source_image'] = $file;
            $config['create_thumb'] = TRUE;
            $config['maintain_ratio'] = TRUE;
            $config['width'] = 300;
            $config['height'] = 169;

            $this->load->library('image_lib', $config);

            $this->image_lib->resize();
            $this->image_lib->clear();
            $formData['image_thumb'] = str_replace(".jpg", "_thumb.jpg", $fileName);
            
        }
        $formData['user'] = $this->session->userdata('userid');
        $formData["location"] = $this->input->ip_address();
        $id = $this->dao->save_record("upload_images", $formData);
        echo '{"MESSAGE" : "SUCCESS"}';
    }
    
    public function delete_image($id) {
        $usedcount = $this->dao->countDataFromInnerJoin(NULL, "recent_cases", array("upload_images" => "upload_images.id = recent_cases.image_id"), "upload_images.id = " . $id, NULL, NULL);
        if($usedcount > 0) {
            echo '{"MESSAGE" : "ERROR"}';
            return;
        }
        $data = $this->dao->get_record('upload_images', $id);
        $this->dao->delete_record("upload_images", $id);
        //remove image from file system.
        $image = $data['image_name'];
        if (!empty($image)) {
            $path = $data['image_path'];
            $file = "./" . $path . '/' . $image;
            unlink($file);
            unlink(str_replace(".jpg", "_thumb.jpg", $file));
        }
        echo '{"MESSAGE" : "SUCCESS"}';
    }

}
