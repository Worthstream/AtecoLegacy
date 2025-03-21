
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
html += "<h2 class='atecoTitle'>Area download</h2>\n";
html += "<div id='atecoDownload'>\n";
html += "<dl><dt>Classificazione</dt>\n";
html += "<dd><a href='/it/files/2011/03/STRUTTURA.zip?title=Classificazione+Ateco+2007+-+01%2Fott%2F2009+-+Ateco+2007.zip'>Struttura in versione XLS</a><span class='size'> (zip 132 KB)</span></dd>\n";
html += "<dd><a href='/it/files/2011/03/ateco_xml.zip?title=Classificazione+Ateco+2007+-+01%2Fott%2F2009+-+Ateco+2007+-+Versione+XML.zip'>Struttura in versione XML</a><span class='size'> (zip 176 KB)</span></dd>\n";
html += "<dd><a href='/it/files/2011/03/note_esplicative_ateco.pdf?title=Classificazione+Ateco+2007+-+01%2Fott%2F2009+-+Ateco+2007+-+Note+esplicative.pdf'>Note esplicative</a><span class='size'> (pdf 1 MB)</span></dd>\n";
html += "<dd><a href='/it/files/2011/03/lista_alfabetica_ateco.pdf?title=Classificazione+Ateco+2007+-+01%2Fott%2F2009+-+Ateco+2007+-+Elenco+alfabetico.pdf'>Elenco alfabetico</a><span class='size'> (pdf 1013 KB)</span></dd>\n";
html += "<dd><a href='/it/files/2011/03/metenorme09_40classificazione_attivita_economiche_2007.pdf?title=Classificazione+Ateco+2007+-+01%2Fott%2F2009+-+Ateco+2007+-+Volume+integrale.pdf'>Volume integrale Ateco 2007</a><span class='size'> (pdf 3 MB)</span></dd>\n";
html += "<dd><a href='/it/files/2011/03/ateco2002.pdf?title=Classificazione+Ateco+2007+-+01%2Fott%2F2009+-+Ateco+2002+-+Volume+integrale.pdf'>Volume integrale Ateco 2002</a><span class='size'> (pdf 3 MB)</span></dd>\n";
html += "</dl>\n";
html += "<dl class='raccordi'><dt>Raccordi</dt>\n";
html += "<dd><a href='/it/files/2011/03/Raccordo_Ateco_2002-2007.zip?title=Classificazione+Ateco+2007+-+01%2Fott%2F2009+-+Raccordo+Ateco+2002-2007.zip'>Ateco 2002 - Ateco 2007</a><span class='size'> (zip 53 KB)</span></dd>\n";
html += "<dd><a href='/it/files/2011/03/Tavola_raccordo_Ateco2007-2002_12-12-08.pdf?title=Classificazione+Ateco+2007+-+01%2Fott%2F2009+-+Raccordo+Ateco+2007-2002.pdf'>Ateco 2007 - Ateco 2002</a><span class='size'> (pdf 265 KB)</span></dd>\n";
html += "<dd><a href='/it/files/2011/03/TABELLA_DI_RACCORDO_ATECOFIN2004_ATECO2007.pdf?title=Classificazione+Ateco+2007+-+01%2Fott%2F2009+-+Raccordo+Atecofin+2004+-+Ateco+2007.pdf'>Atecofin 2004 - Ateco 2007</a><span class='size'> (pdf 97 KB)</span></dd>\n";
html += "<dd><a href='/it/files/2011/03/raccordoateco91_02.pdf?title=Classificazione+Ateco+2007+-+01%2Fott%2F2009+-+Raccordo+Ateco+1991-2002.pdf'>Ateco 1991 - Ateco 2002</a><span class='size'> (pdf 419 KB)</span></dd>\n";
html += "<dd><a href='/it/files/2011/03/raccordoateco02_91.pdf?title=Classificazione+Ateco+2007+-+01%2Fott%2F2009+-+Raccordo+Ateco+2002-1991.pdf'>Ateco 2002 - Ateco 1991</a><span class='size'> (pdf 418 KB)</span></dd>\n";
html += "</dl>\n";
html += "<dl class='clear'>\n";
html += "<dt>Includi questo strumento nel tuo sito</dt>\n";
html += "<dd>\n";
html += "<label for='embedded' style='display:none'>Codice da incorporare</label>\n";
html += "<textarea id='embedded' cols='60' style='font-size: 11px;color: #666;'>&lt;iframe src='http://www.istat.it/iframes/ateco/ateco.php' width='550' height='600' frameborder='0'&gt;&lt;/iframe&gt;</textarea>\n";
html += "</dd></dl>\n";
html += "</div>\n";
html += "<div id='faqText' title='Suggerimenti per la ricerca'>\n";
html += "<ul>\n";
html += "<li>Il testo da digitare deve essere breve ma deve descrivere con una certa precisione l'attività economica del soggetto o dell'azienda</li>\n";
html += "<li>Il sistema fornisce un massimo di sette descrizioni corrispondenti al testo digitato</li>\n";
html += "<li>È necessario scegliere la descrizione ritenuta più vicina alla propria attività e confermarla: questo secondo passaggio consente di\n";
html += "ottenere il codice a 6 cifre e il relativo titolo ufficiale della classificazione.</li>\n";
html += "<li>Per ottenere un codice coerente con la propria attività è importante:\n";
html += "<ul>\n";
html += "<li>NON scrivere il codice numerico dell'attività</li>\n";
html += "<li>NON scrivere parole abbreviate o una singola parola</li>\n";
html += "<li>NON descrivere la propria attività tramite proposizioni costituite da soggetto, verbo e complemento</li>\n";
html += "</ul>\n";
html += "</li>\n";
html += "<p>\n";
html += "Ad esempio:\n";
html += "<br/>\n";
html += "<strong>NO</strong> la mia azienda produce macchine utensili<br/>\n";
html += "<strong>SI</strong> produzione di macchine utensili.\n";
html += "</p></li>\n";
html += "<li>\n";
html += "Per indirizzare meglio la ricerca è opportuno orientarsi inizialmente verso il campo di attività. Ad esempio:\n";
html += "	<ul>\n";
html += "		<li>coltivazione di grano (se nel settore Agricoltura)</li>\n";
html += "		<li>produzione o fabbricazione di macchine utensili (se nel settore Manifatturiero)</li>\n";
html += "		<li>vendita all’ingrosso o al dettaglio di libri (Commercio)</li>\n";
html += "		<li>servizio di catering, studio legale, attività di commercialista (esempi dell’area Servizi)</li>\n";
html += "        </ul>\n";
html += "</li>\n";
html += "<li>È bene specificare il prodotto della coltivazione, della produzione o della vendita, oppure il tipo di servizio e l’ambito nel quale si svolge.</li> \n";
html += "<li>Non utilizzare descrizioni della propria attività professionale (dirigente, impiegato, lavoratore autonomo ecc.) ma solamente del campo di attività economica.</li>\n";
html += "<li>Non specificare la forma giuridica dell’azienda (ad esempio società per azioni, s.r.l., società consortile, cooperativa).</li>\n";
html += "<li>Raramente l’inserimento di una singola parola è sufficiente per determinare un codice; per la ricerca per parola chiave si suggerisce di usare l’apposita ricerca per parola chiave.</li>\n";
html += "</div>\n";
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

