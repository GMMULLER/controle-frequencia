<?php
	$nome = "'".$_POST['nome']."'";
	$senha = "'".$_POST['senha']."'";
	
	header("Access-Control-Allow-Origin: *");

	//PHP orientado a objetos
	require_once("usuarios.php");
	$usuario = new Usuarios();
	$aluno = $usuario->alunoOuMentor($nome, $senha);
	
	
	if($aluno == 1){
	//*******************************COMUNICAÇÃO1 EM FUNCIONAMENTO********************************
		$listaAcessos = $usuario->getAcessos($nome, $senha);

	}else if($aluno == 2){
		//codigo professor
		echo $usuario->getAlunosProfessor($nome, $senha);

	}else{
		echo "0";
	}
	
?>

	
