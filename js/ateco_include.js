
function loadExternalFile(filename, filetype){
	console.log(filename + ' loading');
    if (filetype=="js"){ //if filename is a external JavaScript file
        var fileref=document.createElement('script');
        fileref.setAttribute("type","text/javascript");
        fileref.setAttribute("src", filename);
    }
    else if (filetype=="css"){ //if filename is an external CSS file
        var fileref=document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }    
    if (typeof fileref !== "undefined") {
        document.getElementsByTagName("head")[0].appendChild(fileref)
		console.log(filename + ' loaded');
	}
}
var html = "<div id='ateco'><div id='boxAteco'>\n";
html += "<a name='top' ></a>\n";
html += "<section id='search'>\n";
html += "	<label for='autoEncoding' class='caption'>Individua un codice attività</label>\n";
html += "	<input id='autoEncoding' type='text' class='autoEncoding' placeholder='Descrizione attività'></input>\n";
html += "		<span class='autoEncoding button'><span class='fa fa-play' title='invia'></span></span>\n";
html += "		<span class='description'>Inserisci una descrizione sintetica dell'attività economica <a id='faq'>(suggerimenti per la ricerca)</a> e trova il codice corrispondente</span>\n";
html += "		<section id='resultEncodingSearch'></section>\n";
html += "		<br />\n";
html += "	<fieldset>\n";
html += "	  <legend class='caption'>Ricerca per codice attività</legend>\n";
html += "	  <span class='codeSearchGroup'>\n";
html += "<input aria-label='2 cifre' type='text' id='first' maxlength='2' size='2' class='codeSearch' placeholder='00'>.
html += "<input aria-label='3/4 cifre' type='text' id='second' maxlength='2' size='2' class='codeSearch' placeholder='00'>.
html += "<input aria-label='5/6 cifre' type='text' id='third' maxlength='2' size='2' class='codeSearch' placeholder='00'>
html += "	  </span>\n";
html += "	  <span class='codeSearch button'><span class='fa fa-play' title='invia'></span></span>\n";
html += "	</fieldset>\n";
html += "	<span class='description'>Inserisci un codice per risalire all'attività economica (solo caratteri numerici, minimo due digit)</span>\n";
html += "	<section id='resultNavigate'></section>\n";
html += "	<br />\n";
html += "	<label for='textSearch' class='caption'>Ricerca per parola chiave (una sola parola)</label>\n";
html += "	<input type='text' class='textSearch' id='textSearch' placeholder='Parola chiave'></input>\n";
html += "		<span class='textSearch button'><span class='fa fa-play' title='invia'></span></span>\n";
html += "		<span class='description'>Individua all'interno della classificazione tutte le parti in cui è presente la parola inserita</span>\n";
html += "		<section id='resultTextSearch'></section>\n";
		
html += "	<br />\n";
html += "	<span class='description footer'>Si rende disponibile l'intera <a id='navigate'>STRUTTURA DELLA CLASSIFICAZIONE</a> in modalità navigabile.</span>\n";
html += "<div id='navigationContent' style='display:none'></div>\n";

html += "	</div>\n";
html += "</section>\n";
html += "</div>\n";

function loadJquery() {
	if(typeof $ === 'undefined') {
		setTimeout(loadJquery,1000);
	} else {
		$(document).ready(function () {
			loadExternalFile("http://www.istat.it/js/jquery-migrate.js", "js");
			loadExternalFile("http://www.istat.it/js/jquery-ui1.js", "js");
			//loadExternalFile("http://www4-dev.istat.it/js/www_istat_it.js", "js");
			//loadWwwIstat();
			loadExternalFile("http://www.istat.it/iframes/ateco/js/ateco.js", "js");
			loadExternalFile("http://www.istat.it/css/html.css", "css");
			loadExternalFile("http://www.istat.it/css/screen.css", "css");
			loadExternalFile("http://www.istat.it/css/print.css", "css");
			loadExternalFile("http://www.istat.it/iframes/ateco/css/ateco.css", "css");
			loadExternalFile("http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css", "css");
			loadExternalFile("/css/google-fonts.css?family=Roboto|Roboto+Condensed:900,700,500,400,300", "css");
			loadExternalFile("http://www.istat.it/iframes/ateco/css/fontawesome.min.css", "css");
			loadExternalFile("http://www.istat.it/css/jquery-ui-main.css", "css");
			$('body').append(html);
		});
	}
}

function loadWwwIstat() {
	if(typeof www_istat_it === 'undefined') {
		setTimeout(loadWwwIstat,200);
	} else {
		//www_istat_it.state = {lang:   'it'};
		//www_istat_it.userFontSize = { init: function() {},resizeHeight: function () {}};
		//volumiCarousel = function () {};
		//loadExternalFile("http://www.istat.it/js/iface.js", "js");
		
		
	}
}

loadExternalFile("http://www.istat.it/js/jquery.js", "js");
loadJquery();

