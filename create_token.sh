#!/bin/bash
clear;
echo -n "Please enter your username (duck.com address without @duck.com): ";
read user;
#Request OTP per Mail
curl -s https://quack.duckduckgo.com/api/auth/loginlink?user=${user}>/dev/null 2>&1;
echo -n "Please enter the OTP from the email: ";
read otp;
#Parse OTP for URL (replace spaces with plus)
otp=${otp// /+};
#Get register token with email otp and json-parse it
ot_token_req=$(curl -s "https://quack.duckduckgo.com/api/auth/login?otp=${otp}&user=${user}");
ot_token=$(echo $ot_token_req | grep -o '"token":"[^"]*' | grep -o '[^"]*$');
#Get token and json-parse it
token_req=$(curl -s "https://quack.duckduckgo.com/api/email/dashboard" -H "Authorization: Bearer ${ot_token}");
token=$(echo $token_req | grep -o '"user":{"access_token":"[^"]*' | grep -o '[^"]*$');  
echo " ";
echo "Your Duck.com Email-token is: ${token}";
