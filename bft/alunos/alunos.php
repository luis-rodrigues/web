<?php
//$q = intval($_GET['q']);

$con = mysql_connect('localhost','admin','');
if (!$con) { die('Não foi possível conectar: ' . mysql_error($con)); }
mysql_select_db('webdesign_bft');

//function to save new contact 
function saveContact($nome,$sobrenome,$sexo,$nascimento,$servico,$desde,$obs){ 
  $sql = "INSERT INTO bft_alunos (nome,sobrenome,sexo,nascimento,servico,desde,obs) VALUES ('".$nome."','".$sobrenome."','".$sexo."','".$nascimento."','".$servico."','".$desde."','".$obs."');"; 
  $result = mysql_query($sql)or die(mysql_error()); 
}
//function to edit a contact
function updateContact($id,$nome,$sobrenome,$sexo,$nascimento,$servico,$desde,$obs){
  $sql="UPDATE bft_alunos SET nome='".$nome."',sobrenome='".$sobrenome."',sexo='".$sexo."',nascimento='".$nascimento."',servico='".$servico."',desde='".$desde."',obs='".$obs."' WHERE id=".$id;
  $result = mysql_query($sql)or die(mysql_error());
}
//lets write a function to delete contact 
function deleteContact($id){ 
  $sql="DELETE FROM bft_alunos where id=".$id; 
  $result=mysql_query($sql);
} 
//lets get all the contacts 
function getContacts(){ 
  //execute the sql to get all the contacts in db 
  $sql = "SELECT * FROM bft_alunos"; 
  $result = mysql_query($sql); 
  //store the contacts in an array of objects 
  $contacts = array(); 
  while($record = mysql_fetch_object($result)) { 
    array_push($contacts,$record); 
  } 
  //return the contacts 
  return $contacts; 
} 

function saveAval($idAluno,$tipo,$data,$cooperDistancia,$cooperVO2max,$rockportFC,$rockportIdade,$rockportPeso,$rockportSexo,$rockportTempo,$rockportVO2max){
  $sql = "INSERT INTO alunos_avals (idAluno,tipo,data,cooperDistancia,cooperVO2max,rockportFC,rockportIdade,rockportPeso,rockportSexo,rockportTempo,rockportVO2max) 
          VALUES ('".$idAluno."','".$tipo."','".$data."','".$cooperDistancia."','".$cooperVO2max."','".$rockportFC."','".$rockportIdade."','".$rockportPeso."','".$rockportSexo."','".$rockportTempo."','".$rockportVO2max."');";
  $result = mysql_query($sql)or die(mysql_error());
}
function deleteAval($id){
  $sql="DELETE FROM alunos_avals WHERE id=".$id;
  $result = mysql_query($sql)or die(mysql_error());
}
function getAvals($idAluno){
  $sql = "SELECT * FROM alunos_avals WHERE idAluno=".$idAluno;
  $result = mysql_query($sql);
  $avals = array();
  while($record = mysql_fetch_object($result)){
    array_push($avals,$record);
  }
  return $avals;
}
function getAvalResults($id){
  $sql = "SELECT * FROM alunos_avals WHERE id=".$id;
  $result = mysql_query($sql);
  $results = array();
  while($record = mysql_fetch_object($result)){
    array_push($results,$record);
  }
  return $results;
}

function saveTreino($idAluno,$tipo,$data,$cooperDistancia,$cooperVO2max,$rockportFC,$rockportIdade,$rockportPeso,$rockportSexo,$rockportTempo,$rockportVO2max){
  $sql = "INSERT INTO alunos_treinos (idAluno,tipo,data,cooperDistancia,cooperVO2max,rockportFC,rockportIdade,rockportPeso,rockportSexo,rockportTempo,rockportVO2max) 
          VALUES ('".$idAluno."','".$tipo."','".$data."','".$cooperDistancia."','".$cooperVO2max."','".$rockportFC."','".$rockportIdade."','".$rockportPeso."','".$rockportSexo."','".$rockportTempo."','".$rockportVO2max."');";
  $result = mysql_query($sql)or die(mysql_error());
}
function deleteTreino($id){
  $sql="DELETE FROM alunos_treinos WHERE id=".$id;
  $result = mysql_query($sql)or die(mysql_error());
}
function getTreinos($idAluno){
  $sql = "SELECT * FROM alunos_treinos WHERE idAluno=".$idAluno;
  $result = mysql_query($sql);
  $treinos = array();
  while($record = mysql_fetch_object($result)){
    array_push($treinos,$record);
  }
  return $treinos;
}
function getTreinoResults($id){
  $sql = "SELECT * FROM alunos_treinos WHERE id=".$id;
  $result = mysql_query($sql);
  $results = array();
  while($record = mysql_fetch_object($result)){
    array_push($results,$record);
  }
  return $results;
}

//lets handle the Ajax calls now 
$action=$_POST['action']; 
//the action for now is either add, edit or delete 
if($action=="add"){ 
  //get the post variables for the new contact 
  $nome=$_POST['nome']; 
  $sobrenome=$_POST['sobrenome']; 
  $sexo=$_POST['sexo']; 
  $nascimento=$_POST['nascimento']; 
  $servico=$_POST['servico']; 
  $desde=$_POST['desde']; 
  $obs=$_POST['obs']; 
  //save the new contact 
  saveContact($nome,$sobrenome,$sexo,$nascimento,$servico,$desde,$obs); 
  $output['msg']=$nome." foi salvo"; 
  //reload the contacts 
  $output['contacts']=getContacts(); 
  echo json_encode($output); 
}else if($action=="update"){
  //get the post variables for the new contact 
  $id=$_POST['id'];
  $nome=$_POST['nome']; 
  $sobrenome=$_POST['sobrenome']; 
  $sexo=$_POST['sexo']; 
  $nascimento=$_POST['nascimento']; 
  $servico=$_POST['servico']; 
  $desde=$_POST['desde']; 
  $obs=$_POST['obs'];
  //save the new contact 
  updateContact($id,$nome,$sobrenome,$sexo,$nascimento,$servico,$desde,$obs); 
  $output['msg']=$nome." foi atualizado"; 
  //reload the contacts 
  $output['contacts']=getContacts(); 
  echo json_encode($output); 
}else if($action=="edit"){
  $id=$_POST['id'];
  $sql = "SELECT * FROM bft_alunos WHERE id=".$id;
  $result = mysql_query($sql);
  $contacts = array();
  while($record = mysql_fetch_object($result)) { 
    array_push($contacts,$record); 
  } 
  echo json_encode($contacts);
}else if($action=="delete"){ 
  //collect the id we wish to delete 
  $id=$_POST['id']; 
  //delete the contact with that id 
  deleteContact($id); 
  $output['msg']="deletado!"; 
  //reload the contacts 
  $output['contacts']=getContacts(); 
  echo json_encode($output); 
}else if($action=="list"){ 
  $output['contacts']=getContacts(); 
  $output['msg']="lista de todos os alunos cadastrados"; 
  echo json_encode($output); 
}else if($action=="listAvals"){ 
  $idAluno=$_POST['idAluno'];
  $output['avals']=getAvals($idAluno);
  echo json_encode($output); 
}else if($action=="addAval"){
  $idAluno=$_POST['idAluno'];
  $tipo=$_POST['tipo'];
  $data=$_POST['data'];
  if($tipo=='Teste de Cooper'){
    $cooperDistancia=$_POST['cooperDistancia'];
    $cooperVO2max=$_POST['cooperVO2max'];
    $rockportFC='';
    $rockportIdade='';
    $rockportPeso='';
    $rockportSexo='';
    $rockportTempo='';
    $rockportVO2max='';
  }
  else if($tipo=='Teste de Rockport'){
    $cooperDistancia='';
    $cooperVO2max='';
    $rockportFC=$_POST['rockportFC'];
    $rockportIdade=$_POST['rockportIdade'];
    $rockportPeso=$_POST['rockportPeso'];
    $rockportSexo=$_POST['rockportSexo'];
    $rockportTempo=$_POST['rockportTempo'];
    $rockportVO2max=$_POST['rockportVO2max'];
  }
  saveAval($idAluno,$tipo,$data,$cooperDistancia,$cooperVO2max,$rockportFC,$rockportIdade,$rockportPeso,$rockportSexo,$rockportTempo,$rockportVO2max);
  $output['avals']=getAvals($idAluno);
  echo json_encode($output);
}else if($action=="deleteAval"){
  $id=$_POST['id'];
  $idAluno=$_POST['idAluno'];
  deleteAval($id);
  $output['avals']=getAvals($idAluno);
  echo json_encode($output);
}else if($action=="getAvalResults"){
  $id=$_POST['id'];
  $output['results']=getAvalResults($id);
  echo json_encode($output);
}else if($action=="listTreinos"){ 
  $idAluno=$_POST['idAluno'];
  $output['treinos']=getTreinos($idAluno);
  echo json_encode($output); 
}else if($action=="deleteTreino"){
  $id=$_POST['id'];
  $idAluno=$_POST['idAluno'];
  deleteTreino($id);
  $output['treinos']=getTreinos($idAluno);
  echo json_encode($output);
}


?>