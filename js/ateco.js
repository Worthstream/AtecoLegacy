var keySearched = '';
var codeChosed = '';
var atecoJS = {
	getData: function(key) { //download the first result (radio button) from ateco_actr service
		$('#resultEncodingSearch').show();
		var url = "/iframes/ateco/atecor.php";
		var generic = false;
		$.ajax({
			url: url,
			method: 'post',
			data: {'search': key}, 
			contentType: "application/x-www-form-urlencoded;charset=utf-8",
			success: function(data) {  
				data = data.replace(/""/g,'"');
				data = JSON.parse(data);
				keySearched = data['search_string'];
				key = keySearched;
                                if ('history' in window && 'pushState' in history) 
					history.pushState({}, "", "#"+key);
				var html = '<div class="nota"><h5 style="font-size:110%">Possibili classificazioni per "'+key.toUpperCase()+'"</h5></div><div id="testo"><form name="selezione" action="#">';
				for(c in data['0']) {
				  if(data['0'][c]['ateco_code'].trim() == 'n.c.')
				    generic = true;
				  html += '<input type="radio" name="scelta" value="'+data['0'][c]['ateco_code']+' ::'+key+'" style="margin-left:10px">'+data['0'][c]['ateco_description']+"<br/><br/>\n";
				}
				html += '<div align="right" style="background-color: #eee;"><input type="submit" name="sub" value="Conferma" class="btn" title="Conferma della selezione"></div></form></div>';
				if(data['risultato'] == 'falliti') {
				  html = '<div class="nota"><h5 style="font-size:110%">Ricerca fallita!</h5></div><div id="testo">La descrizione fornita non Ã¨ sufficiente ad individuare un codice di attivitÃ . Si consiglia di rileggere con attenzione le indicazioni per lâ€™attribuzione del codice di attivitÃ  economica. Si ricorda di non  utilizzare abbreviazioni, riferimenti ad articoli di legge o alla forma societaria dellâ€™azienda. Inoltre si ricorda di usare solo descrizioni della propria attivitÃ  economica e non quelle relative alla propria attivitÃ  professionale (dirigente, impiegato, lavoratore autonomo, idraulico, professore, direttore, ecc.)</div>';
				}
				if(generic)
				  html = '<div class="nota"><h5 style="font-size:110%">Attenzione!</h5></div><div id="testo">La descrizione Ã¨ insufficiente o troppo generica. Si consiglia di rileggere attentamente le indicazioni per lâ€™attribuzione del codice di attivitÃ .</div>';
				$('#resultEncodingSearch').html(html);
			},
			error: function (xhr, ajaxOptions, thrownError) {
			      var html = '<div class="nota"><h5 style="font-size:110%">Server al momento non raggiungibile</h5></div><div id="testo">Si prega di riprovare a breve.</div>';
			      $('#resultEncodingSearch').html(html);
			}
		}).done(function () {
                    if(codeChosed != '') {
                        $("[name='scelta']").each(function () { 
                            var thisValue = $(this).attr('value').split("::")[0].trim(); 
                            if(thisValue == codeChosed) {
                                $(this).prop('checked',true);
                            }
                        });                                             
                        codeChosed = '';                        
                    }
                })
	},
	pushResponse: function(code,name) { //push the final response of the ateco_actr service in the page (build from decode.json file)
		$.getJSON('/iframes/ateco/data/decode.json',function (data) {
			$('#resultEncodingSearch').html('<div id="resultTitle">Risultati della ricerca di \"' + keySearched.toUpperCase() + '\"<span class="little">a seguito della selezione: '+name.toLowerCase() +'</span></div><ul id="resultList"/>');
			$.each(data, function (index,value) {
				var note = '';
				if(value[0].substr(0,7) == code) {
					note = value[2].replace(/&gt;/g,'>').replace(/&lt;/g,'<');
                                        note = note.replace("<br>","");
					$('#resultList').append('<li><span class="codeFound" title="Visualizza la struttura gerarchica">'+value[0]+'</span><span class="title">'+value[1]+'</span><br />');
                                        if(note != '') {
					    var pattern =  new RegExp(/esclus([a-z])([^a-z])/g);
					    note = note.replace(pattern,"<span class='atecoExclusion'>esclus$1$2 </span>");  
					    pattern = new RegExp(/non includ([a-z])([^a-z])/g);
					    note = note.replace(pattern,"<span class='atecoExclusion'>non includ$1$2 </span>");
					    pattern = new RegExp (/ESCLUS([a-z])([^a-z])/g);
					    note = note.replace(pattern,"<span class='atecoExclusion'>ESCLUS$1$2 </span>");
					    pattern = new RegExp(/NON INCLUD([a-z])([^a-z])/g);
					    note = note.replace(pattern,"<span class='atecoExclusion'>NON INCLUD$1$2 </span>");   
					    noteMore = note.split('<br>');
					    console.log(noteMore);
					    if(noteMore.length > 5) {
					      note = '';
					      for(id in noteMore) {
						if(id == 5) {
						  note += '<br/><span id="readMoreNote">Continua...</span><span class="noteHidden">';
						}
						note += '<br/>' + noteMore[id];
					      }
					      note += '</span>';
					    }
                                            $('#resultList').append('<span class="note">'+note+'</span>');
                                        } 
                                        $('#resultList').append('</li>');
				}
			});
			$('#resultEncodingSearch').append('<span class="backAteco" data-searched="'+keySearched+'"  id="backEncoding">&lt; indietro</span>');                       
                });
	},
	textualSearch: function(text) { //try a textual research on ateco matching the text passed as parameter
			$('#resultEncodingSearch').hide();
			$.ajax({
				url: 'search.php',
				method: 'post',
				data: {'title': text },
				success: function (data) {
					if(data.length == 0) {
						$('#resultTextSearch').html('<span class="noresult">Nessun risultato trovato</span>');
						return false;
					}
					$('#resultTextSearch').html(data);
				}
		});
	},
	buildTree: function() { //navigate the ateco
		var container = '#resultNavigate';
		if(arguments[0])
			container = '#' + arguments[0];
		$('top').children().detach();
		$('#resultTextSearch').html('');
		$('#resultEncodingSearch').html('');
		$('#resultEncodingSearch').hide();
		$('#navigationContent').hide();
		$(container).show();
		$(container).html('<span class="loading">Caricamento in corso...&nbsp;</span><img src="/img/loaderAjax.gif" title="Caricamento in corso" />');
		$.ajax({
			url: '/iframes/ateco/tree.php',
			success: function (data) {
				$(container).html(data);
			}
		}).done(function () {
			atecoJS.accordionBuild($('div[id|="accordion"]'));
			$(document).trigger('accordionBuilt');
		});
	},

	accordionBuild: function (el) { //build the ateco menu as an accordion
		el.accordion({ collapsible: true, active: false,heightStyle: "content" });
		//$('[class^=accordion] *').css('font-size','12px');
		$('[class^=accordion] *').css('font-family',"'Fira Sans', sans-serif !important");
		//$('[id=accordion-sezione] > h2').css('width','80%');
		$('[id|=accordion] h2').css('border-bottom','1px #333 inset');
		$('[id|=accordion] h2').css('font-size','14px');
		$('[id|=accordion] h2').css('color','#333');
		$('[id|=accordion] h2').css('text-align','left');
		//$(".ui-accordion").css('padding-left','10px');
		//$(".ui-accordion").css('padding-right','2px');
		$('[id|=accordion] h2').on('click', function () {
			www_istat_it.resizeHeight(10,true);
		});
	},

	codeFormatting: function () { //get the ateco code formatted for search
		if($('#first').val().length < 2) {
			$('#resultNavigate').html('Il primo campo deve essere di due caratteri');
			return false;
		}
		var code = $('#first').val() + '.';
		if($('#second').val().length == 1)
			code = code + $('#second').val();
		if($('#second').val().length == 2)
			code = code + $('#second').val();
		if($('#third').val().length > 0)
			code = code + '.' + $('#third').val();
		if(code.length == 3 || code.length == 6)
			code = code.substring(0,code.length-1);
		//console.log('built and searching the '+ code);
		var codes =[code];
		if(code.length >= 4)
			codes.push(code.substring(0,2));
		if(code.length >= 5)
			codes.push(code.substring(0,4));
		if(code.length >= 7)
			codes.push(code.substring(0,5));
		if(code.length >= 8)
			codes.push(code.substring(0,7));
		return codes;
	},
};
//show/hide description preventing the accordion event
$(document).on('mousedown','h2 i.fa-bars',function (e) {
	$(this).on('click',function (e) {
		e.stopPropagation();
	});
	$('div.descrizione').hide();
	$('h2 i.fa-times')
		.addClass('fa-bars')
		.removeClass('fa-times');
	$(this).siblings('div').show();
	$(this).removeClass('fa-bars');
	$(this).addClass('fa-times');
});
$(document).on('mousedown','h2 i.fa-times',function (e) {
	$(this).on('click',function (e) {
		e.stopPropagation();
	});
	$('div.descrizione').hide();
	$(this).removeClass('fa-times');
	$(this).addClass('fa-bars');
});
//listener for the search functions (actr first step)
$(document).on('click','span.autoEncoding',function(e) {
	$('#resultTextSearch').html('');
	$('#resultNavigate').html('');
	$('#resultEncodingSearch').show();
	$('#navigationContent').hide();
	$('#resultEncodingSearch').html('<span class="loading">Caricamento in corso...&nbsp;</span><img src="/img/loaderAjax.gif" title="Caricamento in corso" />');
	e.preventDefault();
	var param = $('input.autoEncoding').val().trim();
	atecoJS.getData(param);
});
//textual resarch, parsing data and send the query
$(document).on('click','span.textSearch',function(e) {
 	$('#resultNavigate').hide();
	$('#navigationContent').hide();
	$('#resultEncodingSearch').hide();
	$('#resultEncodingSearch').html('');
	$('#resultTextSearch').show();
	$('#resultTextSearch').html('<span class="loading">Caricamento in corso...&nbsp;</span><img src="/img/loaderAjax.gif" title="Caricamento in corso" />');
	e.preventDefault();
	var param = $('input.textSearch').val().trim();
	var textCk = param.split(" ");
	//console.log(textCk);
	if(textCk.length > 1) {
		$('#resultTextSearch').html("E' possibile cercare una sola parola");
		return false;
	}
	history.pushState({}, "", "#"+param);
	atecoJS.textualSearch(param);
});
//code search
$(document).on('click','span.codeSearch', function (e) {
	history.pushState({}, "", "#codesearch");
	e.preventDefault();
	atecoJS.buildTree();
});
//open the full jquery accordion
$(document).on('click','#navigate',function () {
	$('#first').val('');
	$('#second').val('');
	$('#third').val('');
	$('#navigationContent').show();
	$('#resultEncodingSearch').hide();
	$('#resultEncodingSearch').html('');
	$('#resultTextSearch').hide();
	$('#resultNavigate').hide();
	atecoJS.buildTree('navigationContent'); //back to the navigation tree
});
//second step for the ateco_actr
$(document).on('submit',"[name='selezione']", function (e) {
	e.preventDefault();
        var code = '';
        var testo = $('#testo').text().split("\n");
        var testoResult = [];
        var indexChosed = 0;
        for(id in testo) {
           /* if(id > 1 && testo[id].trim() != '') {     */           
                testoResult.push(testo[id].trim());
          //  }       
        }
        //console.log(testoResult);
        var countIndex = 0;        
        $('[name="scelta"]').each( function () {             
            if(($(this).prop('checked'))) { 
                code = $(this).val().split('::')[0].trim();
                indexChosed = countIndex;
		/*console.log(code);
		console.log(indexChosed);*/
            }            
            countIndex++;
        });        
        codeChosed = code;
        txtSelected = testoResult[indexChosed];
	atecoJS.pushResponse(code,txtSelected);
});
//open the code from textual search
$(document).on('click','.codeAteco',function() {
	var code = $(this).text();
	var codePart = code.split('.');
	$('#first').val(codePart[0]);
	$('#second').val(codePart[1]);
	$('#third').val(codePart[2]);
	$('span.codeSearch').click();
});
//code serach
$(document).on('accordionBuilt', function () {
	var toDelete = [];
	if($('#first').val().length > 0) {
		$('.codice').css('background-color','#fff');
		$('.codice').css('color','#666');
		var codes = atecoJS.codeFormatting();
		var found = [];
		$.each($("#resultNavigate span[class='codice']"), function () {
			var codice = $(this).text();
			if (codes.indexOf(codice) > -1) {
				//console.log('i should open the accordion to show the '+codice+' '+codes[codes.indexOf(codice)]);
				if(codes[codes.indexOf(codice)].length == 2)
					//console.log('and find the parents of ' + codes[codes.indexOf(codice)]);
				$("#accordion-divisione >h2 .codice").each(function () {
				if($(this).text() == codes[codes.indexOf(codice)]) {
					$(this).parents('div').prev()[0].click();
				} else {
					//console.log('devo far sparire: ' + $(this).text());
					toDelete.push($(this).parents('h2'));
					toDelete.push($($(this).parents('div').prev()[0]));
				}
				});
				$(this).parents('h2').click();
				$(this).addClass('atecoHighlight');
				$(this).css('color','#fff');
				//$(document).scrollTop($(this).offset().top - 120);
				found.push(true);
			}
		});		
                for(var el in toDelete) {
                        toDelete[el].hide();
                }		
		if(found.length < codes.length)
                    $('#resultNavigate').html('<strong>Codice non trovato</strong>');
	}
});
//enter keys
$(document).on('keypress','input.autoEncoding', function(e) {
	if(e.keyCode == 13)
		$('span.autoEncoding').click();
});
$(document).on('keypress','input.textSearch', function(e) {
	if(e.keyCode == 13)
		$('span.textSearch').click();
});
$(document).on('keypress','input.codeSearch', function(e) {
	if(e.keyCode == 13)
		$('span.codeSearch').click();
});
//open the 'suggerimenti per la ricerca' dialog text
$(document).on('click','#faq',function () {
	$('#faqText').dialog({autoOpen: false,width: 500,position: {my: "top", at: "center", of: window}});
	$('#faqText').dialog('open');
});
//open the description for the textual resarch (without accordion)
$(document).on('click','.openDescription i', function () {
	var id = $(this).attr('data-id');
	$('#description-'+id).toggle();
});
//back link
$(document).on('click','#backEncoding', function () {        
	$('input.autoEncoding').val($(this).attr('data-searched'));
	$('span.autoEncoding').click();
});
//after 2 character jump to the next field (for the Code search)
$(document).on('keydown','input.codeSearch',function (e) {
    if($(this).val().length == $(this).attr('maxlength') && e.keyCode != 9) {
        $(this).next("input").focus();
    }
});
$(document).on('click','pre .atecoCodeRef', function () {
	var code = $(this).text();
	code = code.split('.');
	$('#first').val(code[0]);
        if(code.length > 1)
            $('#second').val(code[1]);
        if(code.length > 2)
             $('#third').val(code[2]);
	$('span.codeSearch').click();
});
$(document).on('click','.codeFound', function () { //same as before...check for include
	var code = $(this).text();
	code = code.split('.');
	$('#first').val(code[0]);
        if(code.length > 1)
            $('#second').val(code[1]);
        if(code.length > 2)
             $('#third').val(code[2]);
	$('span.codeSearch').click();
});
$(document).on('click','input.codeSearch',function (e) {
	$(this).val('');
});
$(document).on('click','#readMoreNote', function (e) {
  $(this).siblings('.noteHidden').toggle();
});
