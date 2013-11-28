<?php

define('EMAIL_FOR_REPORTS', 'luis@brasilidados.com.br');
define('RECAPTCHA_PRIVATE_KEY', '@privatekey@');
define('FINISH_URI', 'http://');
define('FINISH_ACTION', 'message');
define('FINISH_MESSAGE', 'Mensagem enviada. Retornaremos em breve.');
define('UPLOAD_ALLOWED_FILE_TYPES', 'doc, docx, xls, csv, txt, rtf, html, zip, jpg, jpeg, png, gif');

require_once str_replace('\\', '/', __DIR__) . '/handler.php';

?>


<link rel="stylesheet" href="<?=dirname($form_path)?>/formoid-default.css" type="text/css" />
<? if (frmd_message()): ?>
<span class="alert alert-success"><?=FINISH_MESSAGE;?></span>
<? else: ?>
<!-- Start Formoid form-->
<link rel="stylesheet" href="<?=dirname($form_path)?>/formoid-default.css" type="text/css" />
<script type="text/javascript" src="<?=dirname($form_path)?>/jquery.min.js"></script>
<form class="formoid-default" style="background-color:#FFFFFF;font-size:14px;font-family:'Open Sans','Helvetica Neue','Helvetica',Arial,Verdana,sans-serif;color:#666666;width:480px" title="Contato" method="post">
	<div class="element-text" ><h2 class="title">Contato</h2></div>
	<div class="element-input" ><label class="title">Nome<span class="required">*</span></label><input type="text" name="input2" required="required"/></div>
	<div class="element-email" ><label class="title">Email<span class="required">*</span></label><input type="email" name="email" value="" required="required"/></div>
	<div class="element-textarea" ><label class="title">Mensagem<span class="required">*</span></label><textarea name="textarea" cols="20" rows="5" required="required"></textarea></div>
	<div class="element-submit" ><input type="submit" value="Enviar"/></div>

</form>
<script type="text/javascript" src="<?=dirname($form_path)?>/formoid-default.js"></script>

<!-- Stop Formoid form-->
<? endif; ?>

<?php frmd_end_form(); ?>