<?php

ini_set("soap.wsdl_cache_enabled", "0");
$sms_client = new SoapClient('http://payamak-service.ir/SendService.svc?wsdl', array('encoding'=>'UTF-8'));

/*try {{*/
$parameters['userName'] = "c.09024324737";
$parameters['password'] = "674579";
$parameters['fromNumber'] = "10009611";
$parameters['toNumbers'] = array($_GET['tonumbers']);
$parameters['messageContent'] = $_GET['text'];
$parameters['isFlash'] = false;
$recId = array(0);
$status = 0x0;
$parameters['recId'] = &$recId ;
$parameters['status'] = &$status ;
echo $sms_client->SendSMS($parameters)->SendSMSResult;
/*}_*/
/*
catch (Exception $e)_
{
	echo 'Caught exception: ',  $e->getMessage(), "\n";
}*/
?>
