<?php
/**
 * Class to build the ATECO client, for textual and advanced research
 * Author: Paolo Di Domenico
 * Version: 1.0
 */

//require_once('../../../../wp-config.php');

if ( ! getenv('WP_BASE_PATH') )
	putenv('WP_BASE_PATH=' . __DIR__);
if ( ! getenv('RELPATHATECO2025') )
	putenv('RELPATHATECO2025=' . '/wp-content/storage/web/ateco2025/');
if ( ! getenv('SCRIPTPATHATECO2025') )
	putenv('SCRIPTPATHATECO2025=' . '/wp-content/themes/EGPbs5-child/ateco2025/');

class atecoXml {

	/**
	 * @var object
	 * ATECO in simple _xml
	 */
	private $xml;
	private $xsl;

	/**
	 * Parse the xml into the class property
	 * It could be placed in a costructor, but in this way
	 * the tree function can take better benefit from the simple cache method implemented
	 */
	private function _parseXml() {
		$primaryPath = getenv('WP_BASE_PATH') . getenv('RELPATHATECO2025');
		$secondaryPath = getenv('WP_BASE_PATH') . getenv('SCRIPTPATHATECO2025');
		
		if (file_exists($primaryPath . 'data/ateco.xml')) {
		    $this->xml = simplexml_load_file($primaryPath . 'data/ateco.xml');
		} else {
    		$this->xml = simplexml_load_file($secondaryPath . 'data/ateco.xml');
		}

		if (file_exists($primaryPath . "lib/template.xsl")) {
		    $this->xsl = $primaryPath . "lib/template.xsl";
		} else {
    		$this->xsl = $secondaryPath . "lib/template.xsl";
		}	
	}




	/**
	 * Build the Ateco code from an array of codes
	 * @param array
	 * @return array [section=>string,'code'=>string] the element of the ateco key code
	 */
	private function _getCodice($codes) {
		//var_dump($codes);
		if($codes == array())
			return array('section'=>'','code'=>'');
		$res = '';
		for($x=1;$x < count($codes);$x++) {
			$res .= $codes[$x];
			if(strlen($res) == 2 || strlen($res) == 5)
				$res .= ".";
		}
		//var_dump($res);echo '<br>';
		if(strlen($res) == 3 || strlen($res) == 6)
			$res = substr($res,0,-1);                
		return array('section'=>$codes[0],'code'=>$res);
	}

	/**
	 * Get an XML with the response contain the dirty result (with words contained in the key and not just the key searched)
	 * and return a clean array with the xml inside
	 * @param array the array with the xml elements dirty
	 * @param string the searched key
	 * @param string the field where to find the result (titolo|descrizione)
	 * @return array
	 */
	private function _cleanXml($xml,$key,$field) {
		$xmlClean = array();
		foreach($xml as $el) {
			$pattern = "/(^|[^A-Za-z0-9])(".$key.")([^A-Za-z0-9]|$)/si";
			preg_match_all($pattern,  $el->$field, $matches);
			if($matches[1] !== array()) {
				$xmlClean[] = $el;
			}
		}
		return $xmlClean;
	}
	
	/**
	 * Find an elment contained in the titolo field, or in the descrizione field ignoring case
	 * and building the query structure using the parameter passed from client in OR style 
	 * ignoring the word lesser than 3 char long. Return an array with all the elements found
	 * @return array [n=>['xml'=>array,'key'=>string]]
	 */
	private function _find($paramSearch = array()) {
		$x=0;$result = array();
		foreach($paramSearch as  $v) {
			if(strlen($v) > 3) {
                $v=strtolower($v);
				//$title = $this->xml->xpath("//titolo[contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ.;:-(),', 'abcdefghijklmnopqrstuvwxyz       '),' ". $v." ')]/..");
				$title = $this->xml->xpath("//titolo[contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'),'" . trim($v) . "')]/..");
				if(!$title) $title = array();
				$title = $this->_cleanXml($title,$v,'titolo');
				
				//$description = $this->xml->xpath("//descrizione[contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ.;:-,()', 'abcdefghijklmnopqrstuvwxyz       '),' ". $v." ')]/..");
				$description = $this->xml->xpath("//descrizione[contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'),'" . trim($v) . "')]/..");
				if(!$description) $description = array();
				$description = $this->_cleanXml($description,$v,'descrizione');
				
				$xml = array_merge($title,$description);
				$result[$x]['xml'] = $xml;
				$result[$x]['key'] = $v;
				$x++;
			}
		}
		return $result;
	}

	/**
	 * Find the elements in the string and add the 'atecoHighlight' class to it
	 * @param array needle, an array of key to search
	 * @param pointer the pointer to the haystack string
	 */
	private function _highlightText($needle,&$haystack) {
		foreach($needle as $str) {
			if(strlen($str) > 3) {
				$pattern = "/(^|[^A-Za-z0-9])(".$str.")([^A-Za-z0-9]|$)/si";
				preg_match_all($pattern, $haystack, $matches);                                
				if (is_array($matches[0]) && count($matches[0]) >= 1) {
					foreach ($matches[0] as $match) {
                                                //echo $match;
						$strPos = strpos($match,$str);
						$decoration[0] = substr($match,0,$strPos);
						$decoration[1] = substr($match,($strPos+strlen($str)+1));
						$haystack = str_replace($match, ' '.$decoration[0].'<span class="atecoHighlight">'.trim($match).'</span>'.$decoration[1].' ', $haystack);
					}
				}
			}
		}
	}
	
	private function _highlightCode($str) {
		$str = preg_replace("/([0-9][0-9]\.*[0-9]*[0-9]*\.*[0-9]*[0-9]*)/s","<span class='atecoCodeRef'>\\1</span>",$str);
		return $str;
	}
	
	private function _highlightExclusion($str) {
		$str = preg_replace("/esclus([a-z])([^a-z])/s","<span class='atecoExclusion'>esclus\\1\\2 </span>",$str);
		$str = preg_replace("/non includ([a-z])([^a-z])/s","<span class='atecoExclusion'>non includ\\1\\2 </span>",$str);
                $str = preg_replace("/ESCLUS([a-z])([^a-z])/s","<span class='atecoExclusion'>ESCLUS\\1\\2 </span>",$str);
		$str = preg_replace("/NON INCLUD([a-z])([^a-z])/s","<span class='atecoExclusion'>NON INCLUD\\1\\2 </span>",$str);
		return $str;
	}
	
	/**
	 * Get the level of the element sezione,gruppo,classe,categoria,sottocategoria
	 * @param xml the element to insepct
	 * @return int the level of the class
	 */
	private function _findLevel($xml) {
		if(array_key_exists('divisione',$xml))
			return 'sezione';
		if(array_key_exists('gruppo',$xml))
			return 'divisione';
		if(array_key_exists('classe',$xml))
			return 'gruppo';
		elseif(array_key_exists('categoria',$xml))
			return 'classe';
		elseif(array_key_exists('sottocategoria',$xml))
			return 'categoria';
		else
			return 'sottocategoria';
	}
	/**
	 * Build a well formed array for html rendering from matching the user parameter requested to 
	 * the ateco in xml
	 * @return array ([n]=>['section'=>string,'code'=>string,'title'=>string,'description'=>string)
	 */
	private function _buildResult($paramSearch = array()) {
		$this->_parseXml();
		$x=0;$result = array();
		$found = $this->_find($paramSearch);
		foreach($found as $el) {
			foreach($el['xml'] as $xml) {
				$xml_array = (array) $xml;
				$level = $this->_findLevel($xml_array);
				$titolo = (string) $xml->titolo;
				//$codesXml = $this->xml->xpath('//*[titolo="'.$titolo.'"]/ancestor-or-self::*/codice');
				$codesXml = $this->xml->xpath('//'.$level.'[titolo="'.$titolo.'"]/ancestor-or-self::*/codice');
				$code = array();
				foreach($codesXml as $ancestorCode) {
					$code[] = (string) $ancestorCode;
				}                               
				$code = $this->_getCodice($code);  
                                //echo (string) $xml->titolo; 
                                //var_dump($code);
                                //die();
				$result[$x]['section'] = $code['section'];
				$result[$x]['code'] = $code['code'];
				$result[$x]['title'] = $this->_highlightExclusion($xml->titolo);
				$this->_highlightText($paramSearch,$result[$x]['title']);
				$result[$x]['description'] = $this->_highlightExclusion($xml->descrizione);
				$result[$x]['description'] = $this->_highlightCode($result[$x]['description']);
				$this->_highlightText($paramSearch,$result[$x]['description']);
				$x++;
			}
		}
		return $result;
	}

	/**
	 * Function no more used, it was for historical reason compared when used a single field.
	 * now is mandatory to use jut one field and the system switched to the more generic _buildResult for all
	*/
	 private function _singleResult($search) {
		$this->_parseXml();
		$res = $this->xml->xpath('//*[titolo="'.$search.'"]/..');
		$x = 0;
		foreach($res as $xml) {
			var_dump($xml->gruppo);
			$codesXml = $this->xml->xpath('//*[titolo="'.$search.'"]/ancestor-or-self::*/codice');
			$code = array();
			foreach($codesXml as $ancestorCode) {
				$code[] = (string) $ancestorCode;
			}
			$code = $this->_getCodice($code);
			$result[$x]['section'] = $code['section'];
			$result[$x]['code'] = $code['code'];
			$result[$x]['title'] = $xml->titolo;
			$x++;
		}
		return $result;
	}
	
	/**
	 * Return the html of the ateco xml parsed by the template.xsl file 
	 * or its cache representation
	 * @return string (html)
	 */
	public function tree() {
		//unlink("data/ateco.html");
		if(is_file(getenv('WP_BASE_PATH') . getenv('RELPATHATECO2025') . "data/ateco.html")) {
			$html = file_get_contents(getenv('WP_BASE_PATH') . getenv('RELPATHATECO2025') . "data/ateco.html");
			if(trim($html) != '')
				return $html;
		}
		$this->_parseXml();
		$xslDoc = new DOMDocument();
		$xslDoc->load($this->xsl);
		$proc = new XSLTProcessor();
		$proc->importStylesheet($xslDoc);
		$html = $proc->transformToXML($this->xml);
		$html = $this-> _highlightExclusion($html);
		$html = $this->_highlightCode($html);
		
		$dirPath= getenv('WP_BASE_PATH') . getenv('RELPATHATECO2025') . "data/";
		
		if (!is_dir($dirPath)) {
 		   mkdir($dirPath, 0775, true); 
		}

		if($fh = fopen( $dirPath . "ateco.html","w+"))
			fwrite($fh,$html);
			fclose($fh);
		return $html;
	}

	/**
	* Return the array ready to be shown in html
	* @param string the user parameters (tipically from $_POST)
	* @return array (see _buildResult documentation for more info)
	*/
	public function search($search) {
		$paramSearch = explode(" ",$search);
		return $this->_buildResult($paramSearch);
	}
	
	public function singleSearch($search) {
		return $this->_singleResult($search);
	}
}
