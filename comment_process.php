<?php
	//print_r($_POST);
	
	// wait a second to simulate a some latency
usleep(500000);
$to = "youremail@yourdomain.com"; // set your email here
$author = "";
$email = "";
$comment = "";
$captcha = "";
$subject = "FORM CONTACT ";

if (isset($_POST['input_name']))
	$author = $_POST['input_name'];
if (isset($_POST['input_email']))
	$email = $_POST['input_email'];
if (isset($_POST['input_subject']))
	$subject = $_POST['input_subject'];
if (isset($_POST['input_message']))
	$comment = $_POST['input_message'];
if (isset($_POST['input_captcha']))
	$captcha = $_POST['input_captcha'];

if ($captcha!='7') {
	$msg = 'Captcha is not matched';
	echo '<div class="alert error pngfix">'. $msg .'</div>';
	exit();
}

	$date1=date("F d,Y h:i:s a");
	$body="
	  	<table width='450' border='1px' bordercolor='#B6B6B6' align='center'  cellspacing='0' cellpadding='0' style='border:1px solid #B6B6B6; border-collapse:collapse; background-color:#FFF; margin-top:16px; margin-bottom:10px;'>
             <tr>
			 <td colspan='2' style='text-align:center; background-color:#619FCE; font-family:Arial, Helvetica, sans-serif; font-size:14px; color:#fff; font-weight:bold; padding:6px;''>VCARD CONTACT FORM:&nbsp;&nbsp;&nbsp;[&nbsp;$date1&nbsp;]</td>
			 </tr>
			 <tr>
                 <td width='150' align='left' valign='top' style='font-family:Arial, Helvetica, sans-serif; font-size:12px; color:#6D6D6D; font-weight:bold; background-color:#ECF7FF; padding:6px;'>Name:</td>
                 <td width='300' align='left' valign='top' style='font-family:Arial, Helvetica, sans-serif; font-size:12px; color:#000; font-weight:normal; padding:6px;'>$author</td>
             </tr>
			 
			 <tr>
                 <td width='150' align='left' valign='top' style='font-family:Arial, Helvetica, sans-serif; font-size:12px; color:#6D6D6D; font-weight:bold; background-color:#ECF7FF; padding:6px;'>Email:</td>
                 <td width='300' align='left' valign='top' style='font-family:Arial, Helvetica, sans-serif; font-size:12px; color:#000; font-weight:normal; padding:6px;'>$email</td>
             </tr>
			 
			
			
			<tr>
                 <td width='150' align='left' valign='top' style='font-family:Arial, Helvetica, sans-serif; font-size:12px; color:#6D6D6D; font-weight:bold; background-color:#ECF7FF; padding:6px;'>Subject:</td>
                 <td width='300' align='left' valign='top' style='font-family:Arial, Helvetica, sans-serif; font-size:12px; color:#000; font-weight:normal; padding:6px;'>$subject</td>
             </tr>
			 		
			 <tr>
                 <td width='150' align='left' valign='top' style='font-family:Arial, Helvetica, sans-serif; font-size:12px; color:#6D6D6D; font-weight:bold; background-color:#ECF7FF; padding:6px;'>Message:</td>
                 <td width='300' align='left' valign='top' style='font-family:Arial, Helvetica, sans-serif; font-size:12px; color:#000; font-weight:normal; padding:6px;'>$comment</td>
             </tr>
             </table>";
			
//$from=$firstNameField;
       $sub="Legion Contact Form - ".$date1;
	   $name=$author."< ".$email." >";
	  
	$msg = '';
	if (@mail($to,$sub,$body,"Content-Type: text/html; charset=iso-8859-1"))
		{
			$msg = 'success';
			//echo '<div class="alert success pngfix">'. $msg .'</div>';
		}
		else{
			$msg = 'Email failed to be sent (mail function not work)';
			//echo '<div class="alert error pngfix">'. $msg .'</div>';
		}
	echo $msg;
?>