<?php
//error_reporting(E_ALL);
//ini_set('display_errors', 1);
session_start();
require_once('config.php');

if (isset($_SESSION['session_id'])) {
    header('Location: report_view.php');
    exit;
}
$ldapHost = "ldap://pc.istat.it:";// set here your ldap host
$ldapPort = "389";// ldap Port (default 389)
$domain = '@istat.it';
$suffixUser = '@pc.istat.it';
$ldapConnection = ldap_connect($ldapHost . $ldapPort) or die("That LDAP-URI was not parseable");
$msg = 'Inserisci username e password di dominio';
if (isset($_POST["reportLogin"]) && $ldapConnection !== false) {
	$username  = str_replace($domain, '', htmlentities($_POST["username"], ENT_QUOTES));
	$password = htmlentities($_POST["password"], ENT_QUOTES);
    $ldapbind = @ldap_bind($ldapConnection, $username . $suffixUser, $password);
    $msg = 'Credenziali utente errate';

    if ($ldapbind) {
        $ldaptree = 'OU=Internal,OU=Users,OU=Organization,DC=pc,DC=istat,DC=it';
        $filter = "(samaccountname={$username})";
        $result=ldap_search($ldapConnection, $ldaptree, $filter);
        $data = ldap_get_entries($ldapConnection, $result);
        $msg = "LDAP bind successful...";
        $db = new mysqli($MYSQL_HOST, $MYSQL_LOGIN, $MYSQL_PASS, $MYSQL_DB);
        $db->set_charset('utf8mb4'); // always set the charset

        if (!empty($username) && !empty($password)) {
            $query = "SELECT username FROM user WHERE username = ?";
            $stmt = $db->prepare($query);
            $stmt->bind_param("s", $username);
            $stmt->execute();
            $stmt->bind_result($user);
            $res = $stmt->fetch();
            $msg = 'Credenziali utente errate';
            
            if ($user !== false && !is_null($res)) {
                session_regenerate_id();
                $_SESSION['session_id'] = session_id();
                $_SESSION['session_user'] = $user;
                $_SESSION['commonName'] = $data[0]['cn'][0];
                header('Location: report_view.php');
                exit;
            }
            $stmt->close();
            $db->close();
        }
    }
	ldap_close($ldapConnection);
}
?>
<!DOCTYPE html>
<html lang="it">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Report login</title>
    </head>
    <body>
        <form method="post" action="report.php">
            <h1>Ateco Report login</h1>
            <input type="text" id="username" placeholder="Username" name="username">
            <input type="password" id="password" placeholder="Password" name="password">
            <button type="submit" name="reportLogin" value="reportLogin">Accedi</button>
            <h5 style="color:red"><?php echo $msg;?></h5>
        </form>
    </body>
</html>
