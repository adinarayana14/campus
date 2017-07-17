<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Enquiry extends MY_Controller {

    private $data;

    public function __construct() {
        parent::__construct();
        $this->data = array();
        $this->load->library('services');
    }

    public function index() {
        /*$this->validateinputs();
        $this->data['errors'] = '';
        if ($this->form_validation->run() == TRUE) {
            
        } else {
            //redirect();
            echo $_SERVER['HTTP_REFERER'];
            $_SESSION['captcha_error'] = form_error('6_letters_code');
            redirect($_SERVER['HTTP_REFERER']);
        }*/
        $formdata['name'] = $this->input->post('name');
        $formdata['email'] = $this->input->post('email');
        $formdata['message'] = $this->input->post('message');
        $code = $this->input->post('6_letters_code');
        $secureCode = $_SESSION['6_letters_code'];
        if (isset($secureCode) && !empty($secureCode)) {
            if ($code == $secureCode) {
                $message = $this->getMessage($formdata);
                $this->sendMailToAdmin($formdata, $message);
                $respose = $this->sendMailToRecipient($formdata);
                if ($respose) {
                    $this->success();
                } else {
                    $this->fail();
                }
            }
        }
//        $this->sendMailToAdmin($formdata, $message);
//        $respose = $this->sendMailToRecipient($formdata);
//        if ($respose) {
//            $this->success();
//        } else {
//            $this->fail();
//        }
    }

    private function validateinputs() {
        $this->load->library('form_validation');
        $config = array(
            array('field' => 'name',
                'label' => 'Name',
                'rules' => 'required',
                'errors' => array(
                    'required' => 'Please enter your %s.',
                )
            ),
            array('field' => 'email',
                'label' => 'Email',
                'rules' => 'required',
                'errors' => array(
                    'required' => 'Please enter your %s.',
                )
            ),
            array('field' => 'message',
                'label' => 'Message',
                'rules' => 'required',
                'errors' => array(
                    'required' => 'Please enter the %s.',
                )
            ),
            array('field' => '6_letters_code',
                'label' => 'Code',
                'rules' => 'required|min_length[5]|callback_captcha_check',
                'errors' => array(
                    'required' => 'Please enter the above 6 latters %s.',
                    'min_length' => 'please enter all 6 latters'
                )
            )
        );
        $this->form_validation->set_rules($config);
    }

    public function captcha_check($str) {
        $secureCode = $_SESSION['6_letters_code'];
        if (isset($secureCode) && !empty($secureCode)) {
            if ($str != $secureCode) {
                $this->form_validation->set_message('captcha_check', 'please enter valid 6 latters {field}');
                return FALSE;
            }
        } else {
            $this->form_validation->set_message('captcha_check', 'Your seesion is time out. Please refresh the browser.');
            return FALSE;
        }
        return TRUE;
    }

    private function getMessage($formdata) {
        /* return 'Email ID: ' . $formdata['email'] . '<br><br>'
          . 'Name: ' . $formdata['name'] . '<br><br>'
          . 'Message: ' . $formdata['message']; */

        return 'Name: ' . $formdata['name'] . '<br><br>'
                . 'Message: ' . $formdata['message'];
    }

    public function sendMailToAdmin($data, $message) {

        //$to = $data['email'];
        //$to = 'sales@mycampuscard.com';
        $to = 'sales@mycampuscard.com';
        $subject = 'Enquiry';

        // To send HTML mail, the Content-type header must be set
        $headers = 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

        // Additional headers
        $headers .= "From: " . "My Campus Card <noreply@mycampuscard.com>" . "\r\n"
                . "Reply-To: " . $data['email'] . "\r\n"
                . "X-Mailer: PHP/" . phpversion();

        //$mailmessage = "<h4>Hello Sir/Madam</h4></br>";
        //$mailmessage .= "<h4>Thank you for your interest with us, we will reach you soon...</h4></br>";
        //$mailmessage .= "<p>The Following are your details</p></br></br>";
        //$mailmessage .= $message;
        // Mail it
        $respose = mail($to, $subject, $message, $headers);
        return $respose;
    }

    public function sendMailToRecipient($data) {

        $to = $data['email'];
        //$to = 'adinarayana.i@gmail.com';
        $subject = 'Enquiry';

        // To send HTML mail, the Content-type header must be set
        $headers = 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

        // Additional headers
        $headers .= "From: " . "My Campus Card Sales<noreply@mycampuscard.com>" . "\r\n"
                . "X-Mailer: PHP/" . phpversion();

        $mailmessage = "<h4>Hello Sir/Madam</h4></br>";
        $mailmessage .= "<h4>Thank you for your interest with us, we will reach you soon...</h4></br>";

        $mailmessage .= "</br></br></br></br><p>*** This is an automatically generated email, please do not reply ***</p>";
        // Mail it
        $respose = mail($to, $subject, $mailmessage, $headers);
        return $respose;
    }

    public function success() {
        $this->load->view('pages/success');
    }

    public function fail() {
        $this->load->view('pages/fail');
    }

}
