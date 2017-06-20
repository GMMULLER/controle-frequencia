var senha;
var nome;


$(function(){
	//variável para ver se está na tela de login
	var telaLogin = 1;
	
	//**********************************FUNÇOES PARA LOGIN******************************
	function login(){
		nome = $("#nome").val().toString().toLowerCase();
		senha  = $("#senha").val().toString();

		var confere = true;

		if(nome == ""){
			$("#aviso1").text("Nome inválido");
			confere = false;
		}else{
			$("#aviso1").text("");
		}
		if(senha.toString() == ""){
			$("#aviso2").text("Senha inválida");
			confere = false;
		}else{
			$("#aviso2").text("");
		}


		if(confere == true){
			var req = $.get("http://botanicapp.com.br/cleyton/estagiarios/getAcess.php", {nome:nome,senha:senha}, function(result){
				var resultadoString = parseInt(result);
				if(resultadoString != 0){
					telaLogin = 0;
					novaTela(result, nome);
				}else{
					$("#aviso3").text("Usuário ou senha inválido");
					nome = "";
					senha = "";
				}
			});

			req.always(function(){
				$("#gifCarregando").remove();
				$("main").append("<img id=\"gifCarregando\" src=\"./images/gifCarregando.gif\">");		
			});

			req.fail(function(){
				$("#gifCarregando").remove();
			});

			req.done(function(){
				$("#gifCarregando").remove();
			});

			

		}
	}
	
	$("#confirma").click(function(){
		login();
	});

	$(document).keypress(function(e){
		if(e.wich == 13 || e.keyCode == 13){
			if (telaLogin) {
				login();
			}
		}
  	})

  	//*************************FIM FUNCOES PARA LOGIN***************************
	
	function novaTela(resultado, nome){
		//Verifica se é aluno ou professor
		var objetos = JSON.parse(resultado);
		var gv = JSON.parse(objetos[0]);
		$("footer").empty();
		console.log(gv.bandeira1);
		if (gv.bandeira1 == 1) {
			//aluno
			telaAluno(objetos, nome);
		}else if (gv.bandeira1 == 2){
			//Professor
			telaProfessor(objetos);
		}

	}

});
