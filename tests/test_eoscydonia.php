<html>
<head>
<meta charset="UTF-8">	
  <style>
    body { font-family: verdana; }
  </style>
</head>


<body>
<h3>PHP-example for a EOS-Cydonia server.</h3>
Pure PHP! This lib is risky - NO WARRENTY. Just a <em>proof of concept</em>!
<br>


<?php
 
$action = "";
$account = "";
if ( isset($_REQUEST['action']) )  $action = trim($_REQUEST['action']);
if ( isset($_REQUEST['account']) ) $account = trim($_REQUEST['account']);

if ($account != "") print("<br>[".$account."]<br>"); 

?>
<hr>
<h3>Get Balance</h3>
<?php
if ($action == "getbalance")
   {
   $json_param = '{"action":"getbalance","account": "'.$account.'"}';
   $json_array = curl_call($json_param);
 
   print("<pre>");
   print_r( $json_array );
   print("</pre>");
   } // getbalance
?>


<form action='test_getbalance.php' method='post'>
<input id='action' name='action' type='hidden' value='getbalance'><br>
Account: <input id='account' name='account' type='text' placeholder='eosiomeetone' value=''><br>
<input type='submit' value='Get Balance'>
</form>


<hr>
<h3>Transfer EOS</h3>


<?php
$action2 = "";
$account = "";
$toaccount = "";
$memo = "";

if ( isset($_REQUEST['action2']) ) $action2 = trim($_REQUEST['action2']);
if ( isset($_REQUEST['account']) ) $account = trim($_REQUEST['account']);
if ( isset($_REQUEST['memo']) ) $memo = trim($_REQUEST['memo']);
if ( isset($_REQUEST['toaccount']) ) $toaccount = trim($_REQUEST['toaccount']);
  

 
if ($action2 == "transfer")
   {
   $json_param = '{"action":"transfer","contract": "eosio.token",  "from":"sommersommer", "to":"'.$toaccount.'", "memo":"'.$memo.'", "amount":"0.0001", "token":"EOS", "secret":"sandf$tasde"  }';

   $json_array = curl_call($json_param);

   print("<pre>");
    print_r( $json_array );
   print("</pre>");
   } // getbalance
   

?>

<a name='transfer'></a>
<form action='test_getbalance.php' method='post'>
<input id='action2' name='action2' type='hidden' value='transfer'><br>
send to:<input id='toaccount' name='toaccount' type='text' placeholder='eosiomeetone' value=''><br>
memo:<input id='memo' name='memo' type='text' placeholder='this is a test memo' value=''><br>
<input type='submit' value='Transfer'>
</form>


<hr>

<a name='checkpayment'></a>
<h3>Check Payment</h3>

<?php
   $contract = "";
   $amount = 5;
   $to = "";
   $memo = "";
 
if ($action == "checkpayment")
   {
   if ( isset($_REQUEST['contract']) ) $contract = trim($_REQUEST['contract']);
   if ( isset($_REQUEST['account']) ) $account = trim($_REQUEST['account']);
   if ( isset($_REQUEST['amount']) ) $amount = trim($_REQUEST['amount']);
   if ( isset($_REQUEST['token']) ) $token = trim($_REQUEST['token']); 
   if ( isset($_REQUEST['to']) ) $to = trim($_REQUEST['to']);    
   if ( isset($_REQUEST['memo']) ) $memo = trim($_REQUEST['memo']);
          
   $json_param = '{"action":"checkpayment","contract": "'.$contract.'", "amount":"'.$amount.'", "token":"'.$token.'", "to":"'.$to.'", "memo":"'.$memo.'", "maxseconds":"33600"}';
 
   $json_array = curl_call($json_param);

   print("<pre>");
    print_r( $json_array );
   print("</pre>");
   } // getbalance
  
  
?>

<form action='test_getbalance.php#checkpayment' method='post'>
<input id='action' name='action' type='hidden' value='checkpayment'><br>
Contract: <input id='contract' name='contract' type='text' placeholder='eosio.token' value='eosio.token'><br>

ammount: <input id='amount' name='amount' type='text' placeholder='0.1000' value='<?php print($amount); ?>'><br>
Token: <input id='token' name='token' type='text' placeholder='EOS' value='EOS'><br>
to: <input id='to' name='to' type='text' placeholder='myeosaccount' value='<?php print($to); ?>'><br>
memo: <input id='memo' name='memo' type='text' placeholder='item123A' value='<?php print($memo); ?>'><br>
<input type='submit' value='Check Payment'>
</form>

 


<hr>
<strong>Get last actions</strong><br>
<?php
  
$action = "";
$account = "";

if ( isset($_REQUEST['action']) ) $action = trim($_REQUEST['action']);
if ( isset($_REQUEST['account']) ) $account = trim($_REQUEST['account']);
   

if ($action == "getlastactions")
   {
   print("Get last actions (".$account.")<br>");
 
   $json_param = '{"action":"lastactions","account": "'.$account.'", "count":"60"}';

   $json_array = curl_call($json_param);

   print("<pre>");
    print_r( $json_array );
   print("</pre>");
   } // getbalance
   

?>

<form action='test_getbalance.php' method='post'>
<input id='action' name='action' type='hidden' value='getlastactions'><br>
<input id='account' name='account' type='text' placeholder='eosiomeetone' value=''><br>
<input type='submit' value='Get last actions'>
</form>

 
</br>
</br>
 
</body>
</html>


<?php
//
// curl_call()
//
function curl_call($json_param)
{
#
# URL from your EOS-Cydonia server
#
$url = "http://xxx.xxx.xxx.xxx:443";

$ch = curl_init($url);

curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");    			
curl_setopt($ch, CURLOPT_POSTFIELDS, $json_param);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_TIMEOUT, 5000);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5000);

$file_contents = curl_exec($ch);

if(curl_exec($ch) === false)
{
echo 'Curl-Error: ' . curl_error($ch);
}
 
curl_close($ch);    
 
$json_array = json_decode($file_contents, true);

return($json_array);
} // function curl_call($json_param)



?>