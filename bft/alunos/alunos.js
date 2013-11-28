// JavaScript Document 
//global variable to hold client copy of the addresses in the database 

addresslist="";
avallist="";
var idUpdate;

//function to ensure there are no duplicate entries 
function isDuplicate(nome,sobrenome){ 
	var isduplicate=false; 
	for(var i=0;i<addresslist.length; i++){ 
		if(addresslist[i].nome.toLowerCase()==nome.toLowerCase() 
		&& addresslist[i].sobrenome.toLowerCase()==sobrenome.toLowerCase()){ 
			isduplicate=true; 
		} 
	} 
	return isduplicate; 
} 

//reload the address list using ajax 
function displayAddressList(items){ 
	//empty the contacts lists 
	var list=$('#contacts-lists'); 
	//save a client copy of the items array for validation whenever its refreshed from server 
	addresslist=items; 
	//loop thru all the items and add to the list 
	var lh=""; 
	for(var i=0;i<items.length; i++){ 
		lh+="<li>"+items[i].nome; 
		lh+=" [ "+items[i].sobrenome+" ] "; 
		lh+='<a href="#delete-id" class="deletebtn" contactid="'+items[i].id+'"> deletar </a>';
		lh+='<a href="#edit-id" class="dadosbtn" contactid="'+items[i].id+'"> dados </a>';
		lh+='<a href="#avals-id" class="avalsbtn" contactid="'+items[i].id+'"> avaliações </a>';
		lh+='<a href="#treinos-id" class="treinosbtn" contactid="'+items[i].id+'"> treinos </a>';
		lh+="</li>";
		lh+='<div class="editInfo" contactid="'+items[i].id+'"></div>';
	} 
	list.html(lh); 
	//set buttons events after every reload 
	setDeleteButtonEvents();
	setEditInfoButtonsEvents();
	setUpdateButtonEvents();
	setSaveButtonEvent();
} 

function displayAvalList(avals){
	var list=$('#avals-lists');
	var lh="<br>";
	for(var i=0;i<avals.length;i++){
		lh+='<li> ['+avals[i].data+'] '+avals[i].tipo;
		lh+='<a href="#aval-view" class="avalviewbtn" avalid="'+avals[i].id+'"> ver </a>';
		lh+='<a href="#aval-delete" class="avaldeletebtn" avalid="'+avals[i].id+'"> deletar </a>';
		lh+='</li>';
	}
	list.html(lh);
}

function displayTreinoList(treinos){
	var list=$('#treinos-lists');
	var lh="<br>";
	for(var i=0;i<treinos.length;i++){
		lh+='<li> ['+treinos[i].data+'] '+treinos[i].tipo;
		lh+='<a href="#treino-view" class="treinoviewbtn" treinoid="'+treinos[i].id+'"> ver </a>';
		lh+='<a href="#treino-delete" class="treinodeletebtn" treinoid="'+treinos[i].id+'"> deletar </a>';
		lh+='</li>';
	}
	list.html(lh);
}

//function to set the save contact button event 
function setSaveButtonEvent(){ 
	$('#save-contact-btn').click(function(){ 
		//hide notice 
		$('#notice').hide(); 
		//get the name and phone data 
		var nome=$('#nome').val(); 
		var sobrenome=$('#sobrenome').val(); 
		var sexo=$('#sexo').val(); 
		var nascimento=$('#nascimento').val(); 
		var servico=$('#servico').val(); 
		var desde=$('#desde').val(); 
		var obs=$('#obs').val(); 
		//validate: ensure the nome of phone is not empty, the name and phone not in dbase and 
		//the name has only text and number has only numbers 
		if(nome=="" || sobrenome==""){ 
			$('#notice').empty().html('nome e sobrenome precisam ser preenchidos').show('slow'); 
		}
		else if(isDuplicate(nome,sobrenome)){ 
			$('#notice').empty().html('já existe um aluno cadastrado com esse nome').show('slow'); 
		}
		// else if(isNaN(new Number(sobrenome))){ $('#notice').empty().html('the phone field must contain valid numeric data').show('slow');}
		//else if(nome.match(/d/)){ $('#notice').empty().html('o nome deve conter apenas letras').show('slow'); }
		//else if(sobrenome.match(/d/)){ $('#notice').empty().html('o sobrenome deve conter apenas letras').show('slow'); }
		else{ 
			//call the ajax save function 
			$('#notice').empty().html('salvando...').show(); 
 			$.ajax({ 
	 			url: 'alunos.php', 
	 			data: 'action=add&nome='+nome+'&sobrenome='+sobrenome+'&sexo='+sexo+'&nascimento='+nascimento+'&servico='+servico+'&desde='+desde+'&obs='+obs, 
	 			dataType: 'json', 
	 			type: 'post', 
	 			success: function (j) {   
					//show the notice   
					$('#notice').empty().html(j.msg); 
					//empty the input fields 
					$('#nome').val(''); 
					$('#sobrenome').val(''); 
					$('#sexo').val('');
					$('#nascimento').val('');
					$('#servico').val('');
					$('#desde').val('');
					$('#obs').val('');
					//refresh the address list 
					displayAddressList(j.contacts);
	 			} 
			}); 
		} 
	}); 
} 



function setUpdateButtonEvents(){
	$('#update-contact-btn').click(function(){ 
		//get the name and phone data
		var id=idUpdate;
		var nome=$('#nome').val(); 
		var sobrenome=$('#sobrenome').val(); 
		var sexo=$('#sexo').val(); 
		var nascimento=$('#nascimento').val(); 
		var servico=$('#servico').val(); 
		var desde=$('#desde').val(); 
		var obs=$('#obs').val(); 
		//validate: ensure the nome of phone is not empty, the name and phone not in dbase and 
		//the name has only text and number has only numbers 
		if(nome=="" || sobrenome==""){ 
			$('#notice').empty().html('nome e sobrenome precisam ser preenchidos').show('slow'); 
		}
		else{ 
			//call the ajax save function 
			$('#notice').empty().html('atualizando...').show(); 
 			$.ajax({ 
	 			url: 'alunos.php', 
	 			data: 'action=update&id='+id+'&nome='+nome+'&sobrenome='+sobrenome+'&sexo='+sexo+'&nascimento='+nascimento+'&servico='+servico+'&desde='+desde+'&obs='+obs, 
	 			dataType: 'json', 
	 			type: 'post', 
	 			success: function (j) {   
					//show the notice   
					$('#notice').empty().html(j.msg); 
					//empty the input fields 
					$('#nome').val(''); 
					$('#sobrenome').val(''); 
					$('#sexo').val('');
					$('#nascimento').val('');
					$('#servico').val('');
					$('#desde').val('');
					$('#obs').val('');
					//refresh the address list 
					$('#add-contact-form').hide('slow');
					displayAddressList(j.contacts);
	 			} 
			}); 
		} 
	}); 

}

//function to set the edit contact button event 
function setEditInfoButtonsEvents(){ 
	$('.dadosbtn').each(function(i){
		$(this).click(function(){
			var id=$(this).attr('contactid');
			idUpdate=$(this).attr('contactid');
			$('.editInfo').hide('slow');
			$('.editInfo[contactid='+id+']').show('slow').load('dados.html');
			$.ajax({
				url: 'alunos.php',
				data: 'action=edit&id='+id,
				dataType: 'json',
				type: 'post',
				success: function(j) {
					$('#notice').hide('slow');
					$('#editDados-form #nome').val(j[0].nome);
					$('#editDados-form #sobrenome').val(j[0].sobrenome);
					$('#editDados-form #sexo').val(j[0].sexo);
					$('#editDados-form #nascimento').val(j[0].nascimento);
					$('#editDados-form #servico').val(j[0].servico);
					$('#editDados-form #desde').val(j[0].desde);
					$('#editDados-form #obs').val(j[0].obs);
				}
			});
		});
	}); 
	$('.avalsbtn').each(function(i){
		$(this).click(function(){
			var idAluno=$(this).attr('contactid');
			$('.editInfo').hide('slow').empty();
			$('.editInfo[contactid='+idAluno+']').show('slow').load('avals.html');
			
			$.ajax({
				url: 'alunos.php',
				data: 'action=listAvals&idAluno='+idAluno,
				dataType: 'json',
				type: 'post',
				success: function(j) {
					displayAvalList(j.avals);
				}
			});
		});
	});
	$('.treinosbtn').each(function(i){
		$(this).click(function(){
			var idAluno=$(this).attr('contactid');
			$('.editInfo').hide('slow').empty();
			$('.editInfo[contactid='+idAluno+']').show('slow').load('treinos.html');
			
			$.ajax({
				url: 'alunos.php',
				data: 'action=listTreinos&idAluno='+idAluno,
				dataType: 'json',
				type: 'post',
				success: function(j) {
					displayTreinoList(j.treinos);
				}
			});
		});
	});
} 

//function to set all delete button events 
function setDeleteButtonEvents(){ 
	$('.deletebtn').each(function(i){ 
		//set the delete event on each delete button 
		$(this).click(function(){ 
			//confirm 
			var answer = confirm("tem certeza que quer deletar este aluno?"); 
			if(!answer){ 
				return; 
			} 
			//hide the form if its there 
			$('#add-contact-form').hide(); 
			//set the delete notice 
			$('#notice').empty().html('deletando...').show(); 
			//get the contactid of the current delete btn 
			var id=$(this).attr('contactid'); 
			//call the ajax deleete function 
			$.ajax({ 
				url: 'alunos.php', 
				data: 'action=delete&id='+id, 
				dataType: 'json', 
				type: 'post', 
				success: function (j) {   
					$('#notice').empty().html(j.msg); 
					//refresh the address list 
					displayAddressList(j.contacts); 
				} 
			}); 
		}); 
	}); 
}

//initilize the javascript when the page is fully loaded 
$(document).ready(function(){ 
	//hide the add contact form 
	$('#add-contact-form').hide(); 
	//hide the notice  
	$('#notice').hide(); 
	//set the add contact form button event 
	$('#add-contact-btn').click(function(){ 
		//hide the notice if its still there 
		$('#notice').hide(); 
		//show the add contact form slowly when button is clicked
		$('#update-contact-btn').hide();
		$('#save-contact-btn').show();
		$('#add-contact-form').show('slow');
	});
	//set the cancel button event 
	$('#cancel-btn').click(function(){ 
		$('#add-contact-form').hide('slow'); 
		$('#notice').hide(); 
		//empty the input fields 
		$('#nome').val(''); 
		$('#sobrenome').val(''); 
		$('#sexo').val('');
		$('#nascimento').val('');
		$('#servico').val('');
		$('#desde').val('');
		$('#obs').val('');
	}); 
	//load the address list now
	//call the ajax save function 
	$.ajax({ 
		url: 'alunos.php', 
		data: 'action=list', 
		dataType: 'json', 
		type: 'post', 
		success: function (j) { 
			//refresh the address list 
			displayAddressList(j.contacts);
		}
	}); 
}); 