jQuery(function($) {
	$("#botao-imc").click(atualiza);
});

var atualiza = function() {
	var nome = $('#input-nome').val();
	var altura = $('#input-altura').val();
	var peso = $('#input-peso').val();
	var valorImc = Math.round(peso / (altura*altura));

	$('#imc-resultado').remove();
	$('body').append('<p id="imc-resultado">O IMC de ' + nome + ' é igual a ' + valorImc + '</p>');
}