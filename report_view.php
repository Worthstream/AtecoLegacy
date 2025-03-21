<?php
//error_reporting(E_ALL);
//ini_set('display_errors', 1);
session_start();
require_once('config.php');

if (isset($_POST['Logout']) || !isset($_SESSION['session_id'])) {
	session_destroy();
	session_unset();
	$url = 'report.php';//'http://www.istat.it/iframes/ateco/report.php';
	header( 'Content-type: text/html; charset=utf-8' ); // make sure this is set
	header("Location: " . $url, true, 307); // 307 is temporary redirect
	echo "<html></html>";  // - Tell the browser there the page is done
	flush();               // - Make sure all buffers are flushed
	ob_flush();            // - Make sure all buffers are flushed
	exit;      
}

if (isset($_SESSION['commonName'])) {
	$commonName = htmlentities($_SESSION['commonName'], ENT_QUOTES);
}

if (!isset($_SESSION['CREATED'])) {
    $_SESSION['CREATED'] = time();
} elseif (time() - $_SESSION['CREATED'] > 1800) {
    // session started more than 30 minutes ago
    session_regenerate_id(true);    // change session ID for the current session and invalidate old session ID
    $_SESSION['CREATED'] = time();  // update creation time
}

if (isset($_SESSION['LAST_ACTIVITY']) && (time() - $_SESSION['LAST_ACTIVITY'] > 1800)) {
    // last request was more than 30 minutes ago
    session_unset();     // unset $_SESSION variable for the run-time 
    session_destroy();   // destroy session data in storage
}
$_SESSION['LAST_ACTIVITY'] = time();

/////// generate report
if (isset($_POST['Scarica'])){
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];

    	try{
        	$db = new PDO('mysql:host=california4.istat.it;dbname=atecor;', 'atecor_ddl', 'DV5GuLp98vTe', array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
    	} catch(PDOException $ex) {
        	echo $ex->getMessage();
    	}

    	header('Content-type: text/csv');
    	header('Content-Disposition: attachment; filename="Report-Ateco-'. $startdate .'-'.$enddate .'.csv"');

    	try {
        	$stmt = $db->prepare("
			SELECT stringa as Stringa, count(stringa) as Occorrenze 
			FROM `stringheAteco` 
			WHERE tstamp > :start
			AND tstamp < :end
			AND stringa REGEXP '[A-Za-z]' 
			GROUP BY stringa 
			ORDER BY `Occorrenze` DESC 
		");
	$stmt->bindParam(':start', $startdate);
	$stmt->bindValue(':end', $enddate . " 23:59");
        $stmt->execute();
        $output = fopen('php://output', 'w');
	fputs($output, $bom = (chr(0xEF) . chr(0xBB) . chr(0xBF)));
        $header = true;
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            if ($header) {
                fputcsv($output, array_keys($row), ';');
                $header = false;
            }
            fputcsv($output, $row, ';');
        }
        fclose($output);
	exit();
    } catch (PDOException $e) {
        echo $ex->getMessage();
    }




}



?>
<!DOCTYPE html>
<html lang="it">
    <head>
        <script src="the-datepicker.js"></script>
        <link rel="stylesheet" href="the-datepicker.css">
        <title>Istat - Report sulle query Ateco</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  	<body>
		<div style="float:right;width:10%">
			<h5 style="margin:1%"><?php echo $commonName;?></h5>
			<form method="post" action="report_view.php" style>
				<button type="submit" name="Logout" value="Logout">Esci</button>
			</form>
		</div>
		<?php
		
		?>    
		<p>Scegli una data di inizio e fine per il report:</p>
	
		<form method="post" action="report_view.php" style>
			<input type="text" id="startdate" name="startdate">
			<input type="text" id="enddate" name="enddate">
			<button type="submit" name="Scarica" value="Scarica">Scarica Report</button>  	
		</form>
	    	<script>
        		(function () {
            			const startinput = document.getElementById('startdate');
            			const datepicker1 = new TheDatepicker.Datepicker(startinput);
				datepicker1.options.setInputFormat("Y-m-d");
				datepicker1.options.setMinDate("2021-11-15");
				datepicker1.options.setMaxDate("today");
	            		datepicker1.render();
            			const endinput = document.getElementById('enddate');
            			const datepicker2 = new TheDatepicker.Datepicker(endinput);
				datepicker2.options.setInputFormat("Y-m-d");
				datepicker2.options.setMinDate("2021-11-15");
				datepicker2.options.setMaxDate("today");
	            		datepicker2.render();
        		})();
	    	</script>
	</body>
</html>
