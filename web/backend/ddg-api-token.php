<?php 
$base_uri = "https://quack.duckduckgo.com/api/";
function curl($url,$auth){
	$req = curl_init($url);
	curl_setopt($req, CURLOPT_RETURNTRANSFER, true);
	if(isset($auth)&&$auth!=null) {
		curl_setopt($req, CURLOPT_HTTPHEADER, array("Authorization: Bearer ".$auth));
	}
	$out = curl_exec($req);
	if(($http_code= curl_getinfo($req, CURLINFO_HTTP_CODE))!=200) {
		die('{"state":"error","description":"Error requesting API: '.$http_code.'"}');
	}
	curl_close($req);
	$array_resp = json_decode($out,true);
	if(isset($array_resp["error"])) {
		die('{"state":"error","description":"'.$array_resp["error"].'"}');
	}
	return $array_resp;
}
?><?php
header('Content-Type: application/json');
if(isset($_POST["username"])&&!isset($_POST["otp"])) {
	$user = $_POST["username"];
	curl($base_uri."auth/loginlink?user=$user",null);

	die('{"state":"success","task":"requestAuthEmail"}');
} else if (isset($_POST["otp"])&&isset($_POST["username"])) {
	$array_resp=curl($base_uri."auth/login?otp=".urlencode($_POST["otp"])."&user=".urlencode($_POST["username"]),null);
	if(!isset($array_resp["token"])) {
		die('{"state":"error","description":"No_otp_token_in_response"}');
	}
	$array_resp=curl($base_uri."email/dashboard",$array_resp["token"]);
	if(!isset($array_resp["user"]["access_token"])) {
		die('{"state":"error","description":"No_access_token_in_response"}');
	} else {
		die(json_encode(array("state" => "success","token" => $array_resp["user"]["access_token"])));
	}
}
die('{"state":"error","description":"Unknown_error"}'); 
?>