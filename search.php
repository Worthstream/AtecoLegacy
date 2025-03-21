<?php
require_once('lib/ateco.php');
if(!array_key_exists('title',$_POST) && !array_key_exists('singleTitle',$_POST) )
	die('not valid request');
	
$ateco = new atecoXml();
if(array_key_exists('title',$_POST))
	$result = $ateco->search($_POST['title']);
else {
	//no more used
	$result = $ateco->singleSearch($_POST['singleTitle']);
}
$res = array();
foreach($result as $v) {
	//$k = str_pad(str_replace(".","",$v['code']),6,"0",STR_PAD_RIGHT);
	$k = str_replace(".","",$v['code']);
	$res['A'.$v['section'].$k] = $v;
}
ksort($res);
if(count($result) > 0) {
$x=0;
?>
<div id='resultText'>
	<span id='textHeader'>Sono stati trovati: <b><?php echo count($res);?></b> elementi</span>
	<?php foreach($res as $row) {?>
		<span class='found'>
                    <?php if($row['code'] == '') {?>
                        <?php echo $row['section'];?>
                    <?php } else { ?>
                        <span class='codeAteco'><?php echo $row['code'];?></span>
                    <?php } ?>
                         <span class='titleAteco'><?php echo $row['title'];?></span>
		<?php
			if(trim($row['description']) != '') {?>
				<span class='openDescription'><i class="fa fa-bars" title="note" data-id='<?php echo $x;?>'></i></span>
				<pre class='descriptionText' id='description-<?php echo $x;?>'><?php echo $row['description'];?></pre>
		<?php 
		$x++;
		}?>
	</span>
	<?php }?>
</div>
<?php
}
