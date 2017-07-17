<?php

defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Description of Services
 *
 * @author adinarayana.idamakan
 */
class Services {

    public function __construct() {
        
    }

    public function getHomeLinks() {
        return array('HM' => "#header", "PD" => "#products", "SS" => "#successstories", "NW" => "#newsstories", "CU" => "#contactus",
            "TM" => "#testimonials", "GL" => "#globalclients", "IG" => "#integrations", "AU" => "#aboutus", "PP" => base_url("personaldataprotectionpolicy"));
    }

    public function getOtherPageLinks() {
        return array('HM' => base_url(), "PD" => base_url("products"), "SS" => base_url("SuccessStories"), "NW" => base_url("news"), "CU" => "#contactus",
            "TM" => base_url("testimonials"), "GL" => base_url("globalclients"), "IG" => base_url("integrations"), "AU" => base_url("#aboutus"), "PP" => base_url("personaldataprotectionpolicy"));
    }

    public function get_success_stories() {
        $stories = array(array("id" => 1100, "header" => "Jakarta International School", "content" => "<p><i>Jakarta International School (JIS) installs Campus RFID Lockers.</i></p><p>JIS is one of the many schools opting for the new, intelligent Radio frequency identification (RFID) lockers. Like most fast paced, high quality schools, JIS was looking for new ways to manage their daily tasks in the most efficient way. JIS required a safe &amp; secure solution that would allow their students to store their laptops and valuables, especially when using their new swimming pool. This is where the Campus team came in. Using the latest contactless technology, the Campus locker system allows students and staff to open their lockers by simply swiping their intelligent contactless card or waterproof silicon wristband over a central reader.</p><p>We started by evaluating current usage requirements as well as looking at future proofing the system for the school, should their student or staff body increase. Our team proceeded to make an on-site evaluation of the school grounds to identify where the lockers were to be installed.</p><p>Each card or wristband has a unique embedded code that will only open the correct locker when swiped over the reader. All cards &amp; wristbands included a custom design to match school colours and logos.</p><p>This quick and easy process meant that JIS could do away with keys, locks and codes. If cards or wristbands are lost, they can be easily cancelled and and re-issued without the need for breaking or tampering with the lockers themselves.</p><p>These versatile lockers are suitable for use all over the school grounds, whether it be in the hallways, sports hall or even outside. All lockers have a weather ready construction and are highly durable, making them a sound investment for any school.</p><p>As the lockers are controlled using Campus Card, you can use the same card to access your school building or car park, pay for lunch, print documents as well as many other tasks.</p><p><a href=\"/uploades/Lockers-PDF.pdf\" target=\"_blank\">Click here for more information regarding Campus RFID Lockers</a><br>", "image_path" => "assets/images/sucsess_story", "image_name" => "sc1.png"),
            array("id" => 1101, "header" => "Australian International School, Singapore", "content" => "<p>Established in 1993, the Australian International School (AIS) has gained international recognition as an outstanding educational institution for their 2,500 students. Located at new, modern, state of the art facilities in Singapore, the School is a leader in the use of information technologies and communication technologies.</p><p>Consistent with these objectives, AIS implemented a cashless payment solution for their campus and the card is now accepted at 6 touch screen POS devices in 2 cafeteria, and also in their Uniform and stationary shops. The whole process is automated from end to end. &nbsp;The system is synchronized with the schools Synergetic administration system so a Campus account is automatically created whenever new students are added.</p><p>Then the Campus card printing solution personalizes preprinted chip cards with photo, student number and library bar code. &nbsp;As each card passes through the Zebra P330i printer, which can print 60 &nbsp;cards per hour, the contactless chip is initialized and securely linked with the students Campus account ready for issuance.</p><p>The Campus student card uses MiFare contactless chip technology, a global standard for mass transport and banks contactless payments cards, and is read in milliseconds by placing the card within 5cm of the reader. When the card is read in the Campus solution, a photo ID of the student and their name appears on the screen preventing students from swapping or stealing cards. The information held on the card is encrypted and cannot be tampered with or changed.</p><p>Once a Campus account has been setup for each family, parents can topup their account either at the school’s Online Topup webpage using Visa, MasterCard or PayPal, using the self service kiosks located around the school campus, or at the school cashier where it is immediately entered into the Campus Back Office administration system. &nbsp;The funds are then immediately available for use.</p><p>Using their internet, parents can preorder lunches for their younger children up to a month in advance, set daily spend limits for the older students e.g. Canteen daily spend limit = $5, Uniform Store = $8 etc., and ban certain items (such as chips or pizza) to ensure their children maintain a healthy diet.</p><p>For the preordered meals, the caterer knows exactly what food to buy; they prepare the daily meals for the children and then deliver to the classrooms when the children break for lunch. For older students and staff, they simply tap their contactless smart cards at the touch screen POS to pay for their meals and the payment is completed in only a few seconds, significantly reducing the long queues when only cash was accepted.</p><p>The sophisticated cafeteria Campus POS solution maintains a list of all the items sold together with their prices, and touch screen menus are customized for each location. &nbsp;This allows the caterers a simple way to quickly complete each purchase.</p><p>The system also records detailed information of purchases for later reporting and analysis to enable the caterers and the school to better plan and manage the cafeteria business.</p><p>Damian Ferguson, General Manager, Finance and Administration believes the Campus solution enables the school to better manage their business relationship with the appointed canteen food service provider, ‘The solution has been operational for over 8 years now, and is still delivering excellent service to the school, our caterers, parents and of course the students and staff who use it on a day to day basis. &nbsp;Detailed operational data allows appropriate users improved governance over the management of the independent catering business operations’</p><p>From an IT and school administrative perspective, the system makes efficient use of scarce resources. &nbsp;Mark Holland (AIS IT Director) indicated ‘the Campus cashless payments system requires minimal ongoing support by my staff, school administrators, and our caterers. &nbsp;Daily meal orders are downloaded and printed out for meal preparation and attached to each lunchbox for accurate delivery for the younger children. &nbsp;The simple touch screen interfaces allow new cafeteria staff to be quickly trained, and school administrators can easily maintain Campus accounts, print cards and prepare reports using Campus Back Office (CBO)’</p><p>Vertical Payment Solutions Pte. Ltd. is a leading provider of Campus Cashless Payments and Automation solutions to International Schools and Colleges in the Asia acific. &nbsp;Campus solution customers include Australian International School, Singapore, Jakarta International School,, International School of Beijing, Taipei American School, Tanglin Trust School of Singapore, International School of Bangkok. Yokohama International School, international School of Beijing, Faith Academy Philippines, and many more.</p><p>For further information please visit email sales@mycampuscrd.com</p>", "image_path" => "assets/images/sucsess_story", "image_name" => "sc2.png"),
            array("id" => 1102, "header" => "Tanglin Trust School, Singapore", "content" => "<p><i>Cashless payments at Tanglin Trust School, Singapore</i></p><p>Tanglin Trust School, Singapore has over 85 years of experience and tradition in delivering quality learning and growing experience to over 2,500 students from nursery to sixth form.</p><p>Excellent Campus facilities and services are key to providing a good platform for education, &nbsp;therefore Tanglin school contract with Sodexo to provide the catering services to ensure the best possible catering services for its students, staff, and parents. &nbsp;In 2009 Tanglin and Sodexo implemented the Campus cashless payments solution to automate and enhance their junior, senior and ‘gourmet’ staff cafes .</p><p>Contactless cards have been issued to over 1,400 senior students and staff ,who use these on a daily basis to pay for their meals from their prepaid Campus account in 11 windows based touch screen POS devices located in the 3 cafeterias. &nbsp;Parents can topup their accounts online using PayPal, Visa or MasterCard, or with cash using the self service kiosk located on Campus.</p><p>Like most International Schools, Tanglin Trust Schools parents are very demanding. &nbsp;They have high expectations, very busy lives and are quick to complain when services fall short. They like the Campus cashless payments solution because it’s easy to understand, easy to use, and helps them encourage their children to choose healthy options.</p><p>According to Jonno Johnstone, Food &amp; Administration Executive for Tanglin Trust School, ‘Parents particularly like the online ordering facility which is used for all the junior school children. &nbsp;A monthly menu is posted online mid month and parents have until the end of the month to order for the following month. &nbsp;Its straight forward for parents, they go online and can complete the full months order and payment process in around 15 minutes’</p><p>‘The online order menu also features a traffic light system to indicate nutritional value, green for ‘eat often’ to red for ‘eat occasionally’. &nbsp;At a glance, parents can make choices during the ordering process which ensure their children are eating healthy food whilst being able to give them occasional ‘treats’.</p><p>‘Obviously parents need a bit of pushing from time to time. &nbsp;Like most people, parents don’t like change or learning new processes, so when the new system was introduced it took a few months for parents to get used to it. &nbsp;Its important to regularly communicate to parents and we send an email to all parents when the new menus are posted and a reminder just before the order deadline’.</p><p>The online ordering system is also beneficial to Sodexo. &nbsp;Having the full order for the month allows Sodexo to carefully plan their food ordering and preparation, &nbsp;therefore saving costs and reducing food wastage, an important environmental consideration for Tanglin School.</p><p>It has also been important for Tanglin to continually review and improve operational processes. For example, they have just streamlined their forgotten and lost card procedures to help students and school administrators. &nbsp;Students can now &nbsp;use a new a facility on the self service kiosk to issue a temporary voucher to make sure that they don’t go without food.</p><p>The Campus system also helps Sodexo manage their resources efficiently and allows them to focus on the important job of preparing and delivering top quality food. &nbsp; Students simply order, tap and go minimizing queues and Sodexo staff time to process lunch orders. &nbsp; Cashless payments also reduce cash handling issues such as reconciliation and cash shrinkages which is always a challenge in a cash based cafeteria.</p><p>Vertical Payment Solutions Pte. Ltd. is a leading provider of Campus Cashless Payments and Automation solutions to International Schools and Colleges in the Asia Pacific. &nbsp;Campus solution customers include Tanglin Trust School of Singapore, Australian International School, Singapore, Jakarta International School, International School of Beijing, Taipei American School, International School of Bangkok. Yokohama International School, international School of Beijing, Faith Academy Philippines, and many more.</p><p>For further information please email sales@mycampuscrd.com</p>", "image_path" => "assets/images/sucsess_story", "image_name" => "sc3.png"));
        return $stories;
    }

    public function get_news() {
        $stories = array(array("id" => 1105, "header" => "Stamford American International School to open new advanced campus", "content" => "<p>Campus Card is working alongside the Stamford American School on their new leading edge Campus. The new campus to be opened in August will include advanced learning facilities to accommodate 2,500 students aged between two and 18.</p><div class=\"view-article\"><a class=\"btn btn-more\" href=\"/uploades/Stamford-American-School-VPS.pdf\" target=\"_blank\">View Article</a></div>", "image_path" => "", "image_name" => ""),
            array("id" => 1106, "header" => "International School of Bangkok Goes Cashless", "content" => "<p>Vertical Payment Solutions Pte Ltd has announced that its Smart Card technology has been implemented into the International School of Bangkok (ISB). This school is the first one in Thailand to integrate the CAMPUS cashless payment application into the identity cards carried by staff and students. This CAMPUS system is being deployed by Vertical Payment Solutions Pte Ltd to provide multi-application card solutions including identification and cashless payment for transactions within the school campus, for students, staff and parents.</p><div class=\"view-article\"><a class=\"btn btn-more\" href=\"/uploades/2008-10-article.pdf\" target=\"_blank\">View Article</a></div>", "image_path" => "", "image_name" => ""),
            array("id" => 1107, "header" => "Vertical Payment Solutions Deploys INSIDE Contactless Technology to Implement CAMPUS System", "content" => "<p>INSIDE Contactless, the world leader in advanced contactless microprocessor platforms, today announced its contactless payment technology has been used to implement the first CAMPUS cashless payment system in Thailand at the International School of Bangkok (ISB). </p><div class=\"view-article\"><a class=\"btn btn-more\"  href=\"/uploades/in-school-payments.phf\" target=\"_blank\">View Article</a></div>", "image_path" => "", "image_name" => ""),
            array("id" => 1108, "header" => "Australian International School of Singapore Implements Campus Smartcard System", "content" => "<p>INSIDE Contactless’ smartcard technology has been implemented in the Australian International School Singapore (AISS), which is the first school in Singapore to integrate the CAMPUS cashless payment application into the identity cards carried by staff and students. </p><div class=\"view-article\"><a class=\"btn btn-more\"  href=\"/uploades/australian-international-school-of-singapore-news\" target=\"_blank\">View Article</a></div>", "image_path" => "", "image_name" => ""));

        return $stories;
    }

    public function get_posts($type) {
        $stories = array();
        if ($type == "NEWS") {
            $stories = $this->get_news();
        } else {
            $stories = $this->get_success_stories();
        }

        foreach ($stories as $key => $value) {
            $value['urlid'] = $this->seoUrl($value['header']) . '-' . $value['id'];
            //echo $value['urlid'];
            $stories[$key] = $value;
        }
        return $stories;
    }

    public function get_post($id, $type) {
        $stories = array();
        if ($type == "NEWS") {
            $stories = $this->get_news();
        } else {
            $stories = $this->get_success_stories();
        }
        $story = array();
        foreach ($stories as $value) {
            if ($value['id'] == $id) {
                $story = $value;
            }
        }
        return $story;
    }

    public function seoUrl($string) {
        //Lower case everything
        $string = strtolower(trim($string));
        //Make alphanumeric (removes all other characters)
        $string = preg_replace("/[^a-z0-9_\s-]/", "", $string);
        //Clean up multiple dashes or whitespaces
        $string = preg_replace("/[\s-]+/", " ", $string);
        //Convert whitespaces and underscore to dash
        $string = preg_replace("/[\s_]/", "-", $string);
        return $string;
    }

}
