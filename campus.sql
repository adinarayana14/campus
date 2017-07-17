-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jul 17, 2017 at 01:16 PM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `campus`
--

-- --------------------------------------------------------

--
-- Table structure for table `campus_post`
--

CREATE TABLE IF NOT EXISTS `campus_post` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `main_heading` varchar(500) NOT NULL,
  `description` text NOT NULL,
  `image_id` int(10) DEFAULT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `posted_date` timestamp NULL DEFAULT NULL,
  `schedule_date` timestamp NULL DEFAULT NULL,
  `user` varchar(20) NOT NULL,
  `posted` tinyint(1) NOT NULL DEFAULT '0',
  `post_type` tinyint(1) NOT NULL DEFAULT '0',
  `location` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `image_id` (`image_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `ci_sessions`
--

CREATE TABLE IF NOT EXISTS `ci_sessions` (
  `id` varchar(40) NOT NULL,
  `ip_address` varchar(45) NOT NULL,
  `timestamp` int(10) unsigned NOT NULL DEFAULT '0',
  `data` blob NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ci_sessions_timestamp` (`timestamp`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ci_sessions`
--

INSERT INTO `ci_sessions` (`id`, `ip_address`, `timestamp`, `data`) VALUES
('0c282473298bb9f167fc13a9ae553a02986d80ee', '::1', 1500142262, 0x5f5f63695f6c6173745f726567656e65726174657c693a313530303134313937303b646f6369647c733a313a2231223b7573657269647c733a353a2261646d696e223b757365726e616d657c733a353a2241646d696e223b697361646d696e7c623a313b76616c69647c623a313b),
('118ee482beab54020173c2efa415c336e386559e', '::1', 1500059046, 0x5f5f63695f6c6173745f726567656e65726174657c693a313530303035383836373b365f6c6574746572735f636f64657c733a363a226d666a337366223b646f6369647c733a313a2231223b7573657269647c733a353a2261646d696e223b757365726e616d657c733a353a2241646d696e223b697361646d696e7c623a313b76616c69647c623a313b),
('2047d9685b567eed1bb35aaedb1f75b34152c1b3', '::1', 1500143124, 0x5f5f63695f6c6173745f726567656e65726174657c693a313530303134333033323b646f6369647c733a313a2231223b7573657269647c733a353a2261646d696e223b757365726e616d657c733a353a2241646d696e223b697361646d696e7c623a313b76616c69647c623a313b),
('242c555b4fc61d4f099a801daa38e00ddcdcb015', '::1', 1500052540, 0x5f5f63695f6c6173745f726567656e65726174657c693a313530303035323533333b365f6c6574746572735f636f64657c733a363a226d666a337366223b646f6369647c733a313a2231223b7573657269647c733a353a2261646d696e223b757365726e616d657c733a353a2241646d696e223b697361646d696e7c623a313b76616c69647c623a313b),
('2701ba140ef21e1dea65c59173e46038f66d3e88', '::1', 1500058809, 0x5f5f63695f6c6173745f726567656e65726174657c693a313530303035383534363b365f6c6574746572735f636f64657c733a363a226d666a337366223b646f6369647c733a313a2231223b7573657269647c733a353a2261646d696e223b757365726e616d657c733a353a2241646d696e223b697361646d696e7c623a313b76616c69647c623a313b),
('27c6f4856017f7adee8760d42b9369a12f8d0327', '::1', 1500056068, 0x5f5f63695f6c6173745f726567656e65726174657c693a313530303035353834303b365f6c6574746572735f636f64657c733a363a226d666a337366223b646f6369647c733a313a2231223b7573657269647c733a353a2261646d696e223b757365726e616d657c733a353a2241646d696e223b697361646d696e7c623a313b76616c69647c623a313b),
('3d8ff017ca8091c36ce5f813f211292e39709b67', '::1', 1500059256, 0x5f5f63695f6c6173745f726567656e65726174657c693a313530303035393235353b365f6c6574746572735f636f64657c733a363a22367077633579223b646f6369647c733a313a2231223b7573657269647c733a353a2261646d696e223b757365726e616d657c733a353a2241646d696e223b697361646d696e7c623a313b76616c69647c623a313b),
('463eb9494c3b5d5e33147b38a36380f74c70aeac', '::1', 1500055697, 0x5f5f63695f6c6173745f726567656e65726174657c693a313530303035353436363b365f6c6574746572735f636f64657c733a363a226d666a337366223b646f6369647c733a313a2231223b7573657269647c733a353a2261646d696e223b757365726e616d657c733a353a2241646d696e223b697361646d696e7c623a313b76616c69647c623a313b),
('4f126b5cb56a94e0dab86299ea9d5b0db7e1c637', '::1', 1500141395, 0x5f5f63695f6c6173745f726567656e65726174657c693a313530303134313235313b646f6369647c733a313a2231223b7573657269647c733a353a2261646d696e223b757365726e616d657c733a353a2241646d696e223b697361646d696e7c623a313b76616c69647c623a313b),
('5684b11cd406f08cef844c88ccc70d632efdbf93', '::1', 1500057937, 0x5f5f63695f6c6173745f726567656e65726174657c693a313530303035373636323b365f6c6574746572735f636f64657c733a363a226d666a337366223b646f6369647c733a313a2231223b7573657269647c733a353a2261646d696e223b757365726e616d657c733a353a2241646d696e223b697361646d696e7c623a313b76616c69647c623a313b),
('5bc3215a58321114dd2869dda53cd2fc2d9a4295', '::1', 1500060688, 0x5f5f63695f6c6173745f726567656e65726174657c693a313530303036303430353b365f6c6574746572735f636f64657c733a363a22367077633579223b646f6369647c733a313a2231223b7573657269647c733a353a2261646d696e223b757365726e616d657c733a353a2241646d696e223b697361646d696e7c623a313b76616c69647c623a313b),
('6f309a31230d21197362370469e11b534d9e5cc3', '::1', 1500060359, 0x5f5f63695f6c6173745f726567656e65726174657c693a313530303036303130323b365f6c6574746572735f636f64657c733a363a22367077633579223b646f6369647c733a313a2231223b7573657269647c733a353a2261646d696e223b757365726e616d657c733a353a2241646d696e223b697361646d696e7c623a313b76616c69647c623a313b),
('743889e90f960a316bd19b1784d4890cb3d8aac3', '::1', 1500054284, 0x5f5f63695f6c6173745f726567656e65726174657c693a313530303035343036363b365f6c6574746572735f636f64657c733a363a226d666a337366223b646f6369647c733a313a2231223b7573657269647c733a353a2261646d696e223b757365726e616d657c733a353a2241646d696e223b697361646d696e7c623a313b76616c69647c623a313b),
('9656b6663e4f9f2dd0ad3a9fadf774060657131b', '::1', 1500057179, 0x5f5f63695f6c6173745f726567656e65726174657c693a313530303035363936373b365f6c6574746572735f636f64657c733a363a226d666a337366223b646f6369647c733a313a2231223b7573657269647c733a353a2261646d696e223b757365726e616d657c733a353a2241646d696e223b697361646d696e7c623a313b76616c69647c623a313b),
('97bb2433745bd0341b29ecde3239378d825438b2', '::1', 1500052425, 0x5f5f63695f6c6173745f726567656e65726174657c693a313530303035323138383b365f6c6574746572735f636f64657c733a363a226d666a337366223b646f6369647c733a313a2231223b7573657269647c733a353a2261646d696e223b757365726e616d657c733a353a2241646d696e223b697361646d696e7c623a313b76616c69647c623a313b),
('a4f09063ebf0e2196b0aef21aea9873637e7b685', '::1', 1500058470, 0x5f5f63695f6c6173745f726567656e65726174657c693a313530303035383231353b365f6c6574746572735f636f64657c733a363a226d666a337366223b646f6369647c733a313a2231223b7573657269647c733a353a2261646d696e223b757365726e616d657c733a353a2241646d696e223b697361646d696e7c623a313b76616c69647c623a313b),
('a7c7874357b15a84e99cafc9702f25148b4e12a8', '::1', 1500056831, 0x5f5f63695f6c6173745f726567656e65726174657c693a313530303035363533383b365f6c6574746572735f636f64657c733a363a226d666a337366223b646f6369647c733a313a2231223b7573657269647c733a353a2261646d696e223b757365726e616d657c733a353a2241646d696e223b697361646d696e7c623a313b76616c69647c623a313b),
('b7de8962aad4e298ed04c06c3ed2c91fde4c0bd6', '::1', 1500054012, 0x5f5f63695f6c6173745f726567656e65726174657c693a313530303035333734333b365f6c6574746572735f636f64657c733a363a226d666a337366223b646f6369647c733a313a2231223b7573657269647c733a353a2261646d696e223b757365726e616d657c733a353a2241646d696e223b697361646d696e7c623a313b76616c69647c623a313b),
('bdc6378ebd34dadd8ffb1dedef41cf2bee8b8e81', '::1', 1500141251, 0x5f5f63695f6c6173745f726567656e65726174657c693a313530303134303934383b646f6369647c733a313a2231223b7573657269647c733a353a2261646d696e223b757365726e616d657c733a353a2241646d696e223b697361646d696e7c623a313b76616c69647c623a313b),
('c31f38dc0dde9ad70b5ea0666ae195b44775dc42', '::1', 1500142501, 0x5f5f63695f6c6173745f726567656e65726174657c693a313530303134323238383b646f6369647c733a313a2231223b7573657269647c733a353a2261646d696e223b757365726e616d657c733a353a2241646d696e223b697361646d696e7c623a313b76616c69647c623a313b),
('cd146fa630b95824a334d14edde1d0706d4e3f38', '::1', 1500051666, 0x5f5f63695f6c6173745f726567656e65726174657c693a313530303035313430373b365f6c6574746572735f636f64657c733a363a226d666a337366223b646f6369647c733a313a2231223b7573657269647c733a353a2261646d696e223b757365726e616d657c733a353a2241646d696e223b697361646d696e7c623a313b76616c69647c623a313b),
('cf8c3b0507c8fbf2298f6b8884b3e937e88dc3b4', '::1', 1500055092, 0x5f5f63695f6c6173745f726567656e65726174657c693a313530303035343937373b365f6c6574746572735f636f64657c733a363a226d666a337366223b646f6369647c733a313a2231223b7573657269647c733a353a2261646d696e223b757365726e616d657c733a353a2241646d696e223b697361646d696e7c623a313b76616c69647c623a313b),
('df4d8b5146a73142b7745f0b0b4f62956fe44823', '::1', 1500139775, 0x5f5f63695f6c6173745f726567656e65726174657c693a313530303133393634373b646f6369647c733a313a2231223b7573657269647c733a353a2261646d696e223b757365726e616d657c733a353a2241646d696e223b697361646d696e7c623a313b76616c69647c623a313b),
('e85c2b1d73667bbf1535eb0bd7efffacc4f61f20', '::1', 1500051273, 0x5f5f63695f6c6173745f726567656e65726174657c693a313530303035313037343b365f6c6574746572735f636f64657c733a363a226d666a337366223b646f6369647c733a313a2231223b7573657269647c733a353a2261646d696e223b757365726e616d657c733a353a2241646d696e223b697361646d696e7c623a313b76616c69647c623a313b),
('e8d47d60f2f9c526f20e77ef904fd8624bbe0869', '::1', 1500060729, 0x5f5f63695f6c6173745f726567656e65726174657c693a313530303036303731303b365f6c6574746572735f636f64657c733a363a22367077633579223b646f6369647c733a313a2231223b7573657269647c733a353a2261646d696e223b757365726e616d657c733a353a2241646d696e223b697361646d696e7c623a313b76616c69647c623a313b),
('ecd8f6c86821fab31d030bc71021dcba6da5a7b1', '::1', 1500052162, 0x5f5f63695f6c6173745f726567656e65726174657c693a313530303035313837333b365f6c6574746572735f636f64657c733a363a226d666a337366223b646f6369647c733a313a2231223b7573657269647c733a353a2261646d696e223b757365726e616d657c733a353a2241646d696e223b697361646d696e7c623a313b76616c69647c623a313b),
('ef6549b1df2d2f5d70ff9e0ca4a5b5b2a91936a6', '::1', 1500060067, 0x5f5f63695f6c6173745f726567656e65726174657c693a313530303035393739333b365f6c6574746572735f636f64657c733a363a22367077633579223b646f6369647c733a313a2231223b7573657269647c733a353a2261646d696e223b757365726e616d657c733a353a2241646d696e223b697361646d696e7c623a313b76616c69647c623a313b),
('f33697d44d9d546d4531f03e04e1d54cb42fc85f', '::1', 1500050639, 0x5f5f63695f6c6173745f726567656e65726174657c693a313530303035303430383b365f6c6574746572735f636f64657c733a363a226d666a337366223b646f6369647c733a313a2231223b7573657269647c733a353a2261646d696e223b757365726e616d657c733a353a2241646d696e223b697361646d696e7c623a313b76616c69647c623a313b),
('f9e65ab3ee0c74d8cd52c051c0997dd365f0d8a1', '::1', 1500054599, 0x5f5f63695f6c6173745f726567656e65726174657c693a313530303035343538353b365f6c6574746572735f636f64657c733a363a226d666a337366223b646f6369647c733a313a2231223b7573657269647c733a353a2261646d696e223b757365726e616d657c733a353a2241646d696e223b697361646d696e7c623a313b76616c69647c623a313b);

-- --------------------------------------------------------

--
-- Table structure for table `dataprotection`
--

CREATE TABLE IF NOT EXISTS `dataprotection` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `header` varchar(500) DEFAULT NULL,
  `posted` int(11) NOT NULL DEFAULT '0',
  `user` varchar(20) NOT NULL,
  `updated_date` timestamp NOT NULL,
  `location` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `dataprotection`
--

INSERT INTO `dataprotection` (`id`, `content`, `header`, `posted`, `user`, `updated_date`, `location`) VALUES
(1, '<p>This privacy policy has been developed and implemented within Vertical Payment Solutions Pte Ltd. (The Company) to comply with the provisions of the Personal Data Protection Act 2012 (the “PDPA”) and this policy describes the types of personal data we may collect, how we may use this information, and with whom we may share it. This policy also describes the measures we take to protect the security of the information.</p> <p>This privacy policy forms the basis for all data protection &amp; confidentiality clauses in The Company''s employment contracts and sub-contractor agreements. Thus all employees, sub-contractors of The Company are bound by this policy. This policy will also form the basis for data protection and confidentiality obligations of the Company to its Customers through appropriate clauses in the relevant Customer contracts.</p> <p>“Personal Data” and “ Personal Information” in this policy means data that can identify an individual.</p> <p></p> <ul> <li>The Company owns and operates a software product called CAMPUS in Software as A Service (SaaS) model. CAMPUS is a prepaid school account that can be used either online or linked to an identification card. In essence, it creates a cashless school environment. Students, parents and faculty can use the application to purchase meals, text books and stationary as well as perform other administrative tasks such as photocopying and document printing and access control functions. Their card can be used as a form of identification, library card and prepaid debit card but is not limited to these applications.</li> <li>Collection of personal information<br>The Company will collect the following information or related information to enable correct functioning of the software product: <ul> <li>Customers ( Students or Staff ) <ul> <li>Customer Type</li> <li>Customer Id</li> <li>Name (First Name &amp; Last Name)</li> <li>Gender</li> <li>Date Of Birth </li> <li>Family Code</li> <li>Category\\Grade</li> <li>Photo</li> <li>Graduation Year</li> <li>Student Homeroom 2.1.11 Teacher</li> <li>Nickname</li> <li>School Division</li> <li>School Division</li> </ul> </li> <li>Family <ul> <li>Family Code</li> <li>Parent vs Staff Classification</li> <li>Parent Name</li> <li>Reference Number (optional) </li> <li>Address and Postal code </li> <li>Alert Type</li> <li>Email IDs 2.2.8 Mobile No</li> <li>Low Balance Limit </li> <li>Photo</li> <li>Department 2.2.12 Date of Birth 2.2.13 Gender</li> </ul> </li> <li> Card <ul> <li>Student ID </li> <li>Smart Card ID</li> </ul> </li> </ul> </li>\n <li> Ways in which the Company will collect personal data. <ul> <li>The Company will exclusively collect this data through express and written permission from its Customer (the respective educational institute). The Customer will in turn seek necessary express and written permissions from the Designated Guardians and other users of the software. The Customer will provide evidence of the same to the Company from time to time. If the Company learns that the Customer is not in possession of such express, relevant and current permissions then the Company will take steps to immediately delete this information from the CAMPUS software, which will effect the functioning of the software and thus it''s deliverable to the Customer.</li> </ul> </li> <li>Purposes for the collection. <ul><li>The exclusive purpose of collecting this information is for the functioning (developing, implementing, hosting, operating and maintaining) of the CAMPUS software to provide it as a service to the Customer.</li></ul> </li> <li>Disclosure of your personal data to third parties. <ul><li>The Company will not voluntarily disclose this information to any 3rd Party which is not bound to the Company by the Personal Data protection and Confidentiality clauses through appropriate 3rd party agreements (sub-contractor agreement).</li></ul> </li> <li>3rd Party Hosting<br><br> The Company may (upon request from its Customer) host the software application at 3rd Party cloud hosting vendors such as Amazon. In such an instance the standard agreements with such vendors will govern all data protection and confidentiality aspects. The choice of such a vendor will be made in association with the Customer and/or will be expressly communicated to the Customer prior to the collection and deployment of any personal data. By agreeing to the choice of 3rd Party hosting the Customer accepts all liabilities and indemnifies the Company from any data violations or infringements. </li> <li>Location-based services<br><br> The CAMPUS software will use location-based services of the devices from time to time.. This location data is collected from only those devices that the Customer has authorized for use. . The Company may extend the functionality of the CAMPUS software for other location-based functionality. This will be done exclusively through express permissions, as stated in clause 3 of this document. </li> <li>Protection of Personal data<br><br> The Company will take the security of all personal data in its possession very seriously. The Company will employ appropriate technology and physical security arrangements and maintain safeguards to protect against the accidental or unauthorized access, collection, use and disclosure, copying and modification, disposal and deletion and other similar risks to personal data. </li> <li>Integrity and retention of personal information<br><br> The Company will retain all relevant personal data only for the period necessary to fulfill its contractual obligations to its Customer for the service of the CAMPUS software unless a longer retention period is required by Law. </li> <li>Our companywide practices and commitment to your privacy<br><br> To ensure total security of all personal data, the Company will communicate this privacy and security policy to all its employees and sub-contractors and strictly enforce it through valid legal agreements. The Company will appoint a designated Data Protection officer to ensure implementation and compliance of this policy. </li> <li> Access and Correction of Personal Data. <ul> <li>If you wish to know about your personal data in our possession or under our control, or how your personal data has been used or to whom it has disclosed, you may write in to us by filing our Access Request Form (available at your request).</li> <li>We shall charge a standard fee of $ 5 for each Access Request. However, if much effort and time are required to retrieve the personal data, we shall charge a higher fee of approximately $ 20.00 for each request. We can charge an incremental fee for photocopying or courier costs if more copies are requested.</li> <li>This fee shall cover all our actual costs incurred. Examples: photocopying, locating, retrieving, shipping, transport, time spent in preparing the disclosure. It should reflect our time and efforts taken to retrieve the personal data.</li> <li>We shall provide the personal data requested within 30 days after receiving the Access Request. If we cannot respond within 30 days, we shall inform the Applicant (in writing) when we can do so.</li> <li>There may be some circumstances, as outlined under the 5th Schedule and Section 21 of the PDPA that exempts the company from having to accede to an Access Request.</li> <li>If you wish to correct any personal data in our possession or under our control, you may write in to us by filling in a Correction Request Form (available at your request).</li> <li>We shall forward the corrected personal data to every organisation we have sent the personal data to 1 year before the receipt of the Correction Request.</li> <li>We shall correct the personal data requested, where practical, within 30 days.</li> <li>We do not charge any fees for correcting personal data.</li> <li>There may be some circumstances, as outlined under the 6th Schedule and Section 22 of the PDPA that exempts the Company from having to accede to Correction of Personal Data.</li> </ul> </li> <li>Data Protection Officer or DPO <ul> <li> The contact details of the Company''s DPO Shermaine Lowe<br> Phone: +65 63429305<br> <a href="mailto:shermainel@mycampuscard.com">shermainel@mycampuscard.com</a><br> 118, Joo Chiat Road, <br> #03-03, Singapore <br><br> Correct as off June 17, 2017</li> </ul> </li> </ul>', NULL, 1, 'admin', '2017-07-15 14:54:14', '::1');

-- --------------------------------------------------------

--
-- Table structure for table `global_clients`
--

CREATE TABLE IF NOT EXISTS `global_clients` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `description` varchar(200) DEFAULT NULL,
  `image_id` int(11) NOT NULL,
  `user` varchar(20) NOT NULL,
  `location` varchar(50) NOT NULL,
  `updated_date` timestamp NOT NULL,
  `order` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `image_id` (`image_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `home_page`
--

CREATE TABLE IF NOT EXISTS `home_page` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `header` varchar(250) DEFAULT NULL,
  `h_title` varchar(500) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `image_id` int(11) NOT NULL,
  `user` varchar(50) NOT NULL,
  `location` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `image_id` (`image_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `home_page`
--

INSERT INTO `home_page` (`id`, `header`, `h_title`, `created_date`, `image_id`, `user`, `location`) VALUES
(1, 'Remove Cash and Administrative Nightmares', 'A contemporary technology platform, engineered for cloud & mobile with innovative functionality to meet your business needs', '2017-07-04 13:18:26', 1, 'admin', '::1');

-- --------------------------------------------------------

--
-- Table structure for table `media_files`
--

CREATE TABLE IF NOT EXISTS `media_files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `m_path` varchar(50) DEFAULT NULL,
  `m_name` varchar(100) DEFAULT NULL,
  `m_thumb` varchar(150) DEFAULT NULL,
  `user` int(11) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `location` varchar(50) DEFAULT NULL,
  `alt_txt` varchar(150) DEFAULT NULL,
  `title` varchar(150) DEFAULT NULL,
  `type` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `media_files`
--

INSERT INTO `media_files` (`id`, `m_path`, `m_name`, `m_thumb`, `user`, `created_date`, `location`, `alt_txt`, `title`, `type`) VALUES
(1, 'uploads/2017/july', 'banner2.jpg', NULL, 0, '2017-07-02 14:22:15', '::1', 'Home page Banner', 'Home page Banner', 'image/jpeg'),
(2, 'uploads/2017/july', 'cashlesspayment_icon.svg', NULL, 0, '2017-07-02 14:23:35', '::1', 'cashless payment', 'cashless payment', 'image/svg+xml'),
(3, 'uploads/2017/july', 'Lockers-PDF.pdf', NULL, 0, '2017-07-02 14:30:03', '::1', NULL, 'Lockers PDF', 'application/pdf'),
(4, 'uploads/2017/july', 'in-school-payments.pdf', NULL, 0, '2017-07-02 19:04:02', '::1', NULL, 'in school payments', 'application/pdf'),
(5, 'uploads/2017/july', 'sc1.png', NULL, 0, '2017-07-15 17:53:53', '::1', 'JIS', 'JIS', 'image/png'),
(6, 'uploads/2017/july', 'sc2.png', NULL, 0, '2017-07-15 17:54:05', '::1', 'Australian international school', 'Australian international school', 'image/png'),
(7, 'uploads/2017/july', 'sc3.png', NULL, 0, '2017-07-15 17:54:11', '::1', 'Tanglin trust school', 'Tanglin trust school', 'image/png');

-- --------------------------------------------------------

--
-- Table structure for table `upload_images`
--

CREATE TABLE IF NOT EXISTS `upload_images` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `image_name` int(11) DEFAULT NULL,
  `image_path` int(11) NOT NULL,
  `image_thumb` int(11) DEFAULT NULL,
  `created_date` int(11) DEFAULT NULL,
  `alt_text` int(11) DEFAULT NULL,
  `user` int(11) NOT NULL,
  `location` int(11) DEFAULT NULL,
  `title` int(11) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `userid` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL,
  `role` tinyint(1) NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_loggedin` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `userid` (`userid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `userid`, `name`, `password`, `role`, `is_active`, `created_date`, `last_loggedin`) VALUES
(1, 'admin', 'Admin', '$2y$10$K7xgZ5x1Q7D8PiolhSeFruLRtxROZDC86TeI10F1xE8u8fZ7XGNs.', 1, 1, '2017-06-30 03:04:34', NULL);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `global_clients`
--
ALTER TABLE `global_clients`
  ADD CONSTRAINT `global_clients_ibfk_1` FOREIGN KEY (`image_id`) REFERENCES `media_files` (`id`);

--
-- Constraints for table `home_page`
--
ALTER TABLE `home_page`
  ADD CONSTRAINT `home_page_ibfk_1` FOREIGN KEY (`image_id`) REFERENCES `media_files` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
