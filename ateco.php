<!DOCTYPE HTML>
<html lang='it'>
<head>
<link href="/css/bootstrap.css" media="screen" rel="stylesheet" type="text/css" />
<link href="/css/istat.css" media="screen" rel="stylesheet" type="text/css" />
<link href="www.istat.it//favicon.ico" rel="shortcut icon" />
<link href="/css/screen.css" media="screen" rel="stylesheet" type="text/css" />
<link href="/css/ateco.css" media="screen" rel="stylesheet" type="text/css" />
<link href="/css/fontawesome.min.css" media="all" rel="stylesheet" type="text/css" />
<link href="/css/google-fonts.css?family=Fira+Sans+Condensed:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i|Fira+Sans+Extra+Condensed:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i|Fira+Sans:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i&amp;amp;subset=latin-ext" rel="stylesheet">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=EDGE" />
<meta http-equiv="Content-Language" content="it_IT" />
<title>Istat - Ateco 2007</title>
<script type="text/javascript" src="/js/jquery.js"></script>
<script type="text/javascript" src="js/ateco.js"></script>
<script>
var www_istat_it = {state: {lang:  'it'},userFontSize: { init: function() {}},resizeHeight: function () {}};
var volumiCarousel = function () {};
</script>
  <!-- Google Tag Manager-->
  <!--
    <noscript><iframe src="http://www.googletagmanager.com/ns.html?id=GTM-PGBPLX" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <script>
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        '//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-PGBPLX');
    </script>
	-->
    <!-- End Google Tag Manager -->
</head>
<body style='width:525px'>
<div id='ateco'>
<div id='boxAteco'>
<a name='top' ></a>
<section id='search'>
	<label for='autoEncoding' class='caption'>Individua un codice attività</label>
	<input id='autoEncoding' type='text' class='autoEncoding' placeholder='Descrizione attività' disabled></input>
		<span class='autoEncoding button'><span class="fa fa-play" title="Cerca"></span></span>
		<span class='description'>La ricerca per codice attività è temporaneamente non disponibile</span>
		<section id='resultEncodingSearch'></section>
		<br />
	<fieldset>
	  <legend class='caption'>Ricerca per codice attività</legend>
	  <span class='codeSearchGroup'>
	    <input aria-label='2 cifre' type='text' id='first' maxlength='2' size='2' class='codeSearch' placeholder='00'>.
	    <input aria-label='3/4 cifre' type='text' id='second' maxlength='2' size='2' class='codeSearch' placeholder='00'>.
	    <input aria-label='5/6 cifre' type='text' id='third' maxlength='2' size='2' class='codeSearch' placeholder='00'>
	  </span>
	
	  <span class='codeSearch button'><span class="fa fa-play" title="Cerca"></span></span>
	</fieldset>
	<span class='description'>Inserisci un codice per risalire all'attività economica (solo caratteri numerici, minimo due digit)</span>
	<section id='resultNavigate'></section>
	<br />
	<label for='textSearch' class='caption'>Ricerca per parola chiave (una sola parola)</label>
	<input type='text' class='textSearch' id='textSearch' placeholder='Parola chiave'></input>
		<span class='textSearch button'><span class="fa fa-play" title="Cerca"></span></span>
		<span class='description'>Individua all'interno della classificazione tutte le parti in cui è presente la parola inserita</span>
		<section id='resultTextSearch'></section>
		
	<br />
	<span class='description footer'>Si rende disponibile l'intera <a id='navigate'>STRUTTURA DELLA CLASSIFICAZIONE</a> in modalità navigabile.</span>
<div id='navigationContent' style='display:none'></div>

	</div>
</section>

<!--span class='description footer'>I file contenenti i raccordi Ateco 2002 e 2007, il raccordo Atecofin 2004 e Ateco 2007, i raccordi Ateco 1991 e 2002  sono disponibili all'indirizzo <a href='/it/archivio/17888'>www.istat.it/it/archivio/17888</a>.</span-->


<div id='faqText' title='Suggerimenti per la ricerca'>
<ul>
<li>Il testo da digitare deve essere breve ma deve descrivere con una certa precisione l'attività economica del soggetto o dell'azienda</li>
<li>Il sistema fornisce un massimo di sette descrizioni corrispondenti al testo digitato</li>
<li>È necessario scegliere la descrizione ritenuta più vicina alla propria attività e confermarla: questo secondo passaggio consente di
ottenere il codice a 6 cifre e il relativo titolo ufficiale della classificazione.</li>
<li>Per ottenere un codice coerente con la propria attività è importante:
<ul>
<li>NON scrivere il codice numerico dell'attività</li>
<li>NON scrivere parole abbreviate o una singola parola</li>
<li>NON descrivere la propria attività tramite proposizioni costituite da soggetto, verbo e complemento</li>
</ul>
</li>
<p>
Ad esempio:
<br/>
<strong>NO</strong> la mia azienda produce macchine utensili<br/>
<strong>SI</strong> produzione di macchine utensili.
</p></li>
<li>
Per indirizzare meglio la ricerca è opportuno orientarsi inizialmente verso il campo di attività. Ad esempio:
	<ul>
		<li>coltivazione di grano (se nel settore Agricoltura)</li>
		<li>produzione o fabbricazione di macchine utensili (se nel settore Manifatturiero)</li>
		<li>vendita all’ingrosso o al dettaglio di libri (Commercio)</li>
		<li>servizio di catering, studio legale, attività di commercialista (esempi dell’area Servizi)</li>
        </ul>
</li>
<li>È bene specificare il prodotto della coltivazione, della produzione o della vendita, oppure il tipo di servizio e l’ambito nel quale si svolge.</li> 
<li>Non utilizzare descrizioni della propria attività professionale (dirigente, impiegato, lavoratore autonomo ecc.) ma solamente del campo di attività economica.</li>
<li>Non specificare la forma giuridica dell’azienda (ad esempio società per azioni, s.r.l., società consortile, cooperativa).</li>
<li>Raramente l’inserimento di una singola parola è sufficiente per determinare un codice; per la ricerca per parola chiave si suggerisce di usare l’apposita ricerca per parola chiave.</li>
</div>
</div>
</body>
</html>
