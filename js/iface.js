// User font size with cookie
www_istat_it.userFontSize =
{
	name:"fontSize",
	options:{'path':'/','expires':30},
	init:function() {
		var userSize = www_istat_it.cookie(this.name);
		if (userSize==null || userSize=="")
			www_istat_it.fontSize.init();
		else
			www_istat_it.fontSize.size(userSize);
	},
	smaller:function()
	{
		www_istat_it.cookie(this.name, www_istat_it.fontSize.smaller(), this.options);
	},
	larger:function()
	{
		www_istat_it.cookie(this.name, www_istat_it.fontSize.larger(), this.options);
	},
	reset:function()
	{
		www_istat_it.fontSize.reset();
		www_istat_it.cookie(this.name, null);
	}
}

www_istat_it.minSidebarHeight = 0;
www_istat_it.hideAll = function () {
	$('#mainContainer').css('padding-top',0);
	$('.sidemenu.pages').hide();
	$('#sidebar').hide();
	$('#body').css('width','100%');
	$('#document').css('width','100%');
	$('.html').css('width','100%');
	$('.more').hide();
}
www_istat_it.resizeHeight = function (time,reduce) {
//	console.log('BEFORE body:'+$('#body').height() +' '+'sidebar:'+$('#sidebar_page').outerHeight(true));
	setTimeout(function () {
							if($('#body').height() > $('#sidebar_page').outerHeight(true)) {
								$('#sidebar_page').height($('#body').height());
							} else {
								if(reduce) {
									if($('#body').height() > www_istat_it.minSidebarHeight)
										$('#sidebar_page').height($('#body').height());
									else
										$('#sidebar_page').height(www_istat_it.minSidebarHeight);
								}
							}
//							console.log('AFTER body:'+$('#body').height() +' '+'sidebar:'+$('#sidebar_page').outerHeight(true));
				},time);
}

$(document).ready( function() {

	var labelStatistics = 'Statistics by';
	if ('it' == www_istat_it.state.lang)
		labelStatistics = 'Statistiche per';
		
	$('#header').append('<div id="label statistics" style="position:relative;color:#7aba3c;font-size:24px;float:right;clear:right;top:-2.5em;">' + labelStatistics + '</div>');
	if(typeof getCookiePermission !== 'undefined' && getCookiePermission('navigazione')) {
		www_istat_it.userFontSize.init();  
	}
	
	// Console
	var consoleActive = $("#console li." + www_istat_it.state.lang);
	consoleActive.addClass('active');
	$("#tabs > li").hover(
		function () {
			$(this).siblings("li").removeClass('active');
			$(this).addClass('active');
		},
		function () {
			$(this).removeClass('active');
			consoleActive.addClass('active');
		}
	);

	// Menu docs
	var menuActive = $("#header > .menuList li.active");
	$("#header > .menuList > li *").hover(
		function() {
			$(this).parentsUntil('.menuList').addClass('active');
			// IE fa on orrendo sfarfallio...
			// Non si risolve con un setTimeout
			$(this).parentsUntil('.menuList').siblings("li").removeClass('active');
		},
		function() {
			menuActive.addClass('active');
			$(this).parentsUntil('.menuList').removeClass('active');
		}
	);

	// Menu I.Stat
	var IDotStatActive = $("#header > .IDotStatList li.active");
	//$("#header > .IDotStatList > li *").hover(
	$("#header > .IDotStatList > li > a, #header > .IDotStatList > li > ul").hover(
		function() {
			$(this).parentsUntil('.IDotStatList').addClass('active');
			$(this).parentsUntil('.IDotStatList').siblings("li").removeClass('active');
		},
		function() {
			IDotStatActive.addClass('active');
			$(this).parentsUntil('.IDotStatList').removeClass('active');
		}
	);
	var IDotStatLiActive = $("#header > .IDotStatList > li > ul > li.active");
	$('#header > .IDotStatList > li > ul > li').hover(
		function() {
			$(this).addClass('active');
			$(this).siblings('li').removeClass('active');
		},
		function() {
			$(this).removeClass('active');
			IDotStatLiActive.addClass('active');
		}
	);

	// Alternate
	$('.alternate').prev('img').click(function() {
			$(this).next('.alternate').slideToggle('fast');
	});
});


// Sidebar
$(document).ready(function() {    
	var sidebar = new Array(); 
	if(www_istat_it.state.controller == 'congiuntura' || www_istat_it.state.controller == 'economictrends') {
		sidebar['it'] = 162757;
        sidebar['en'] = 162757;
	} else if(www_istat_it.state.controller == 'mapparischi') {
        sidebar['it'] = 201113;
        sidebar['en'] = 201113;
    } else {
		sidebar['it'] = 48812;
		sidebar['en'] = 48815;
		sidebar['evidenza_it'] = 123167;
		sidebar['evidenza_en'] = 123170;
	}
	var pubblicazioniLink = new Array();
	pubblicazioniLink['it'] = '<div style="text-align: center; padding-top: 0.2em" class="volumiAllLink"><a href="/it/prodotti/pubblicazioni" title="Pubblicazioni">Tutte le pubblicazioni</a></div>';
	pubblicazioniLink['en'] = '<div style="text-align: center; padding-top: 0.2em" class="volumiAllLink"><a href="/en/statistics/publications" title="Publications">Publications</a></div>';

	$.getJSON("/proxy.php?url=" + escape("http://docs.istat.it/www/ws/ws.php?action=post&id=" + sidebar[www_istat_it.state.lang]), function(data) {
		$('#sidebar_page').html(data[sidebar[www_istat_it.state.lang]]['page']);
	}).done(function () {
		if(www_istat_it.state.controller != 'congiuntura' && www_istat_it.state.controller != 'economictrends' && www_istat_it.state.controller != 'mapparischi') {
			$.getJSON("/proxy.php?url=" + escape("http://docs.istat.it/www/ws/ws.php?action=post&id=" + sidebar['evidenza_' + www_istat_it.state.lang]), function(data) {
					$('#sidebar_page').prepend(data[sidebar['evidenza_' + www_istat_it.state.lang]]['page']);
			});
            //if(www_istat_it.state.lang != 'en') {
                $('#sidebar_page').append("<div style='height:225px;padding-top:25px;' id='volumiContainer'></div>");
                $('#sidebar_page').append(pubblicazioniLink[www_istat_it.state.lang]);
                volumiCarousel(); 
           // }
		} else if(www_istat_it.state.controller != 'mapparischi') {
            var eventName = 'sidebarCongiunturaLoaded';
            if(www_istat_it.state.lang == 'en') {
                eventName = 'sidebarCongiunturaEnLoaded';
            }
			var e = jQuery.Event( eventName );
			$(window).trigger(e);
		}
	});
});

//Accordion Style
$(document).ready(function() {
    if( window.location.href.indexOf('statistica-per-tutti') < 0 && window.location.href.indexOf('congiuntura') < 0) {
        if(window.location.href.indexOf('amministrazione-trasparente') > 0) {
            $('[class^=accordion-short] *').css('font-family','Roboto');
            $('[class^=accordion-short] *').css('font-size','13px');
        } else {
            $('[class^=accordion-short] *').css('font-size','12px');
        }
        $('[id*=random-accordion] h2').css('border-bottom','1.5px #666 inset');
        $('[id*=random-accordion] h2').css('font-size','16px');
        $('[id*=random-accordion] h2 a').css('color','#666');
        $('[id*=random-accordion] h2').on('click', function () {
            www_istat_it.resizeHeight(300,true);
        });
    }
    $('.Roboto.accordions-shortcode *').css('font-family','Roboto');
    $('.Roboto.accordions-shortcode p').css('font-size','13px');
    $('.Roboto.accordions-shortcode *').css('line-height','16px');
    $('.Roboto.accordions-shortcode div').css('padding','10px');
});

/*
 * Listener e funzioni necessarie per gli eventi lanciati dal ReadSpeaker, qualora sia necessario far partire il testo selezionato aggiungere dove necessario il trigger dell'evento
/*
$('#readspeaker_button1').on('mouseenter',function () {  $(this).trigger('readsepaker_in')});
$('#readspeaker_button1').on('mouseleave',function () {  $(this).trigger('readsepaker_out')});
//Updated version
$('.rsbtn_play').css('display','none');
$('#readspeaker_button1').prepend("<a href='javascript:'><img src='/img/ascolta.png' alt='Ascolta' id='ascoltaRs' /></a>");
$('#readspeaker_button1').on('click',function () {  $(this).trigger('readsepaker_in')});
 */
$(document).ready(function() {
    $('.rsbtn_play').css('display','none');
    var imgRs = '/img/ascolta3.png';
    var titleRs = 'Ascolta con ReadSpeaker';
    var textRs = 'Ascolta';
    if(www_istat_it.state.lang == 'en') {
        imgRs = '/img/listen3.png'; // Personalizzare l'immagine per l'inglese
        titleRs = 'Listen with ReadSpeaker';
        textRs = 'Listen';
    }
   /* $('#readspeaker_button1').prepend("<a href='javascript:' id='rs_Display' title='"+titleRs+"' class='customRS'><img class='ascolta' alt='"+titleRs+"' src='"+imgRs+"' /></a>");*/
    $('#readspeaker_button1').prepend("<a href='javascript:' id='rs_Display' title='"+titleRs+"' class='customRS'>"+textRs+"</a>");
    $('#readspeaker_button1').on('click',function () {
        $('.rsbtn_play').click();
    });
});
	

www_istat_it.selectText = function (element) {
	var text = document.getElementById(element);
	if (typeof window.getSelection === 'undefined') {
		var range = document.body.createTextRange();
		range.moveToElementText(text);
		range.select();
	} else {
		var selection = window.getSelection();
		var range = document.createRange();
		range.selectNodeContents(text);
		selection.removeAllRanges();
		selection.addRange(range);
	}
}

www_istat_it.textToRead = 'document';

www_istat_it.deselectText = function (element) {
	if (typeof window.getSelection === 'undefined') {
		document.selection.empty()
	} else {
		window.getSelection().removeAllRanges()
	}
}
$(document).on('readsepaker_in',function (event) {
	www_istat_it.selectText(www_istat_it.textToRead);
	$('a.rsbtn_play').trigger('mouseup');
	setTimeout(function () {
		$('a.rsbtn_play').trigger('mousedown');
		setTimeout(function() {
			$('a.rsbtn_play').trigger('click');
		},500)},200);
	//this deselect the text by its self. no matter to use readsepaker_out event
	//www_istat_it.deselectText('document');
});

$(document).on('readsepaker_out',function (event) {
	www_istat_it.deselectText('document');
});
$(document).ready(function () {
	setTimeout(function () {
			$('.sidemenu.pages').height($('#sidebar').height()-70);
		},400);
});
