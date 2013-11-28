<?php

$to = "contato@pousadaaldeiadosventos.com.br";
$subject = "Contato pelo website";
$message = $_REQUEST['textarea'];
$email = $_REQUEST['email'];
$headers = "From:" . $email;

mail($to,$subject,$message,$headers);

?>

<html>
<body>

<link rel="stylesheet" href="contact_form/formoid-default.css" type="text/css" />
<form class="formoid-default" style="font-size:14px;font-family:'OpenSansLight','Open Sans','Helvetica Neue','Helvetica',Arial,Verdana,sans-serif;color:#CCC;" title="Contato enviado">Obrigado.<br/>Retornaremos seu contato em 24 horas.<br/>Se houver urgência, por favor entre em contato por um dos telefones abaixo.</form>

</body>
</html>