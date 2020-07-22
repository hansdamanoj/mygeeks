<?PHP
error_reporting(0);
header('Content-type: application/json');

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

function location($ip){
    $cURLConnection = curl_init();

    curl_setopt($cURLConnection, CURLOPT_URL, 'https://tools.keycdn.com/geo.json?host='.$ip);
    curl_setopt($cURLConnection, CURLOPT_RETURNTRANSFER, true);
    
    $phoneList = curl_exec($cURLConnection);
    curl_close($cURLConnection);
    
    $jsonArrayResponse = json_decode($phoneList);
    return $phoneList;
}


$user_ip = getUserIP();

print_r(location($user_ip));


?>