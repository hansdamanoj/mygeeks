<?php
include "locationProcessor.php";

$servername = "localhost";
$username = "mygeeks";
$password = "X8-sTseL_@s=";
$db = "mygeeks";
$to = 'admin@mygeeks.net.au'; // Replace this with your own email address
$to_name = 'My Geeks'; // replace with your name

try {
  $conn = new PDO("mysql:host=$servername;dbname=$db", $username, $password);
  // set the PDO error mode to exception
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
//   echo "Connected successfully";
} catch(PDOException $e) {
  echo "Connection failed: " . $e->getMessage();
}

$email = $_POST['email'];
$user_ip = getUserIP();
// exit(json_encode(["message"=>$user_ip]));
try {
    $sql = "SELECT * from newsletter WHERE email = '$email'";
    $result = $conn->prepare($sql); 
    $result->execute([$bar]); 
    $number_of_rows = $result->fetchColumn();
    if($number_of_rows > 0){
        exit(json_encode(["message"=>"Already Subscribed"]));
    }else{
        $sql = "INSERT INTO newsletter (email, ip) VALUES ('$email', '$user_ip')";
        if($conn->exec($sql)){
        if(sendMail($to,$to_name,$email,'My Geeks User','Newsletter Subscription',prepareAdminTemplete())){
                exit(json_encode(["message"=>"Subscription Successfull"]));
            if(sendMail($email,'My Geeks User',$to,$to_name,'Newsletter Subscription',prepareUserTemplete())){
                exit(json_encode(["message"=>"Subscription Successfull"]));
            }else{
                exit(json_encode(["message"=>"Subscription Failed"]));
            }
        }else{
            exit(json_encode(["message"=>"Subscription Failed"]));
        }
        }else{
            exit(json_encode(["message"=>"Subscription Failed"]));
        }
    }
} catch(PDOException $e) {
  echo "Error: " . $e->getMessage();
}

$conn = null;



function getUserIP()
{
    // Get real visitor IP behind CloudFlare network
    if (isset($_SERVER["HTTP_CF_CONNECTING_IP"])) {
              $_SERVER['REMOTE_ADDR'] = $_SERVER["HTTP_CF_CONNECTING_IP"];
              $_SERVER['HTTP_CLIENT_IP'] = $_SERVER["HTTP_CF_CONNECTING_IP"];
    }
    $client  = @$_SERVER['HTTP_CLIENT_IP'];
    $forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];
    $remote  = $_SERVER['REMOTE_ADDR'];

    if(filter_var($client, FILTER_VALIDATE_IP))
    {
        $ip = $client;
    }
    elseif(filter_var($forward, FILTER_VALIDATE_IP))
    {
        $ip = $forward;
    }
    else
    {
        $ip = $remote;
    }

    return $ip;
}

function sendMail($to,$to_name,$from,$from_name,$subject,$templete){
    require_once('../phpmailer/class.phpmailer.php');
	$mail = new PHPMailer();
	
	$mail->From = $from;
	$mail->FromName = $from_name;
	$mail->Subject = $subject;

	$mail->AddAddress($to, $to_name);
	$mail->IsHTML(true);
	
	$mail->Body = $templete;
		
// 	if ( isset( $_FILES['file'] ) && $_FILES['file']['error'] == UPLOAD_ERR_OK ) {
// 		$mail->AddAttachment( $_FILES['file']['tmp_name'], $_FILES['file']['name'] );
// 	}

	if($mail->Send()){
	    return true;
// 		echo 'Thank you. for getting in touch. We appriciate you contacting us. We will get back in touch with you soon! Have a great day!';
	}else{
	    return 'Mailer Error: ' . $mail->ErrorInfo;
// 		echo 'Message could not be sent.';
// 		echo 'Mailer Error: ' . $mail->ErrorInfo;
	}
}

function prepareAdminTemplete(){
    $email = $_POST['email'];
    
    $head = "The user has subscribed for newsletter";
    $body = "email : ".$email;
    $footer = "from ip: ".getUserIP();
    
    $templete = $head .'<br>'. $body .'<br>'. $footer;
    
    return $templete;
    
}

function prepareUserTemplete(){
    $email = $_POST['email'];
    
    $head = "You have successfully subscribed for the newsletter";
    $body = "email : ".$email;
    $footer = "your ip: ".getUserIP();
    
    $templete = $head .'<br>'. $body .'<br>'. $footer;
    
    return $templete;
    
}

?>