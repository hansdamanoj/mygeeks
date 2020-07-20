<?php

    $site_owners_email = 'admin@mygeeks.net.au'; // Replace this with your own email address
    $site_owners_name = 'My Geeks'; // replace with your name
	
	$prep_name = $_POST['fname']?$_POST['fname']:''. " ". $_POST['lname']?$_POST['lname']:'';
	$name = $_POST['name']?$_POST['name']:$prep_name;
	$tel = $_POST['tel']?$_POST['tel']:'';
	$date = $_POST['date']?$_POST['date']:date("Y/m/d");
	$time = $_POST['time']?$_POST['time']:date("H:i:s");

	$email =  $_POST['email']?$_POST['email']:'';
	$subject =  $_POST['subject']?$_POST['subject']:'';
	$message =  $_POST['message']?$_POST['message']:'';
	$inquiry =  $_POST['inquiry']?$_POST['inquiry']:'Contact Us';

    $isSubmitTypeAjax = true;
// 	$isSubmitTypeAjax = filter_var( $_POST['submitType'], FILTER_SANITIZE_STRING );
	
	
	$nameText = '';
	$telText = '';
	$emailText = '';
	$dateText = '';
	$timeText = '';
	$footerText = '';
// 	$footerText = '<br/><br/><div style="font-size: 12px;">This email is submitted form: ' . (isset($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER[HTTP_HOST] . '</div>';
	
	
	if ( !empty($name) ) {
		$nameText .= '<b>Name:</b> ' . $name . '<br/>';
	}
	
	if ( !empty($tel) ) {
		$telText .= '<b>Telephone:</b> ' . $tel . '<br/>';
	}
	
	if ( !empty($email) ) {
		$emailText .= '<b>E-mail:</b> ' . $email . '<br/>';
	}
	
	if ( !empty($date) ) {
		$dateText .= '<b>Date:</b> ' . $date . '<br/>';
	}
	
	if ( !empty($time) ) {
		$timeText .= '<b>Time:</b> ' . $time . '<br/>';
	}
	
	
	if ( !empty($isSubmitTypeAjax) ) {
		require_once('phpmailer/class.phpmailer.php');
		$mail = new PHPMailer();
		
		$mail->From = $email;
		$mail->FromName = $name;
		$mail->Subject = $subject;

		$mail->AddAddress($site_owners_email, $site_owners_name);
		$mail->IsHTML(true);
		
		$mail->Body = $nameText . $telText . $dateText . $timeText . $enquiry . $emailText . '<br/>' . $message . $footerText;
			
		if ( isset( $_FILES['file'] ) && $_FILES['file']['error'] == UPLOAD_ERR_OK ) {
			$mail->AddAttachment( $_FILES['file']['tmp_name'], $_FILES['file']['name'] );
		}
		
		// $mail->Send();

		if($mail->Send()){
			echo 'Thank you. for getting in touch. We appriciate you contacting us. We will get back in touch with you soon! Have a great day!';
		}else{
			echo 'Message could not be sent.';
			echo 'Mailer Error: ' . $mail->ErrorInfo;
		}
		
		// header("Location: thank-you.html");
		// echo 'Thank you. for getting in touch. We appriciate you contacting us. We will get back in touch with you soon! Have a great day!';
	} else {
		// header("Location: thank-you.html");
		echo 'Message could not be sent.';
		// do nothing...
	}

?>
