// JavaScript Document

jQuery(function($) { 
	$('#menu ul li').click(function() {
		if($(this).context.className == "inactive") {
			if($(this).context.id=="info-galeria"){
				$('#menu ul li.active').toggleClass("active inactive");
				$('.conteudo.active').removeClass("active");
				$('.foto-fundo.active').removeClass("active");
				$('.fotorama#galeria-todas').fadeToggle(1000);
				$('#fecha-galeria').addClass('in');
				$('#nav').addClass('out');
				$('#contatos').addClass('out');
				$('#principal').fadeToggle(1000);
			} else {
				$('#menu ul li.active').toggleClass("active inactive");
				$(this).toggleClass("active inactive");
				$('.foto-fundo.active').removeClass("active");
				$('.foto-fundo#'+$(this).context.id).addClass("active");
				$('#nav').addClass('out');
				$('#contatos').addClass('out');
				$('.conteudo.active').removeClass("active");
				$('.conteudo#'+$(this).context.id).addClass("active");
				setTimeout(function(){
					$('#nav').removeClass('out');
					$('#contatos').removeClass('out');
				}, 2000);
			}
		} else {
			$('.conteudo#'+$(this).context.id).removeClass("active");
			$(this).toggleClass("active inactive");
		}
	});
	
	$('#fecha-galeria').click(function() {
		$('#principal').toggle();
		$('.foto-fundo#fundo-inicio').addClass("active");
		$('.fotorama#galeria-todas').fadeToggle(1000);
		$('#fecha-galeria').removeClass('in');
		setTimeout(function(){
			$('#nav').removeClass('out');
			$('#contatos').removeClass('out');
		}, 1000);
	});
	
	$('#lingua ul li').click(function() {
		if($(this).context.className == "inactive") {
			$('#lingua ul li').toggleClass("active inactive");
		}
	});
	
	$(document).ready($('.fotorama#foto-fundo').fotorama());
	$(document).ready($('.fotorama#galeria-todas').fotorama());

});