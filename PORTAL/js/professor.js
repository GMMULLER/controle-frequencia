var dadosAluno;
var nomeAlunoSelecionado; 

$(function(){
	$("main").on("click", "#recarregarHorarios", function(){
		var mes = $("#resposta").val();
		apresentaDadosDoAluno(dadosAluno, mes);
	});

	$("main").on("click", "#cadastrarHorarioAluno", function(){
		var nomeAluno = $(".modal-body .usuario .us1 label").text();
		var diaExato = $(".modal-footer #diaExato").val();
		var arrayDia = diaExato.split("-");
		var ano = arrayDia[0];
		var mes = arrayDia[1];
		var dia = arrayDia[2];
		var horaExata = $(".modal-footer #horaExata").val();
		var arrayHora = horaExata.split(":");
		var hora = arrayHora[0];
		var minutos = arrayHora[1];
		console.log(horaExata);
		$.get("http://botanicapp.com.br/cleyton/estagiarios/usuarios.php", {nome:nome,senha:senha,aluno:nomeAluno,comando:"novoHorario",diaMes:dia,numMes:mes,ano:ano,minutos:minutos,hora:hora}, function(resultado){
			alert(resultado);
		});
	});

	$("main").on("click", "#cadastrarNovoAluno", function(){
		var nomeAluno = $(".modal-body #nomeAluno").val();
		var senhaAluno = $(".modal-body #senhaAluno").val();
		alert(senhaAluno);
		var idRFID = $(".modal-body #CodigoRFID").val();
		$.get("http://botanicapp.com.br/cleyton/estagiarios/usuarios.php", {nome:nome,senha:senha,nomeAluno:nomeAluno,senhaAluno:senhaAluno,id:idRFID,comando:"cadastraAluno"}, function(resultado){
			alert(resultado);
		});
	});
		$(".formholder").on("click","#cadastrarAluno",function(){
			$(".modal-body").empty();
			$(".modal-body").append("<label>Aluno</label>");
			//$(".modal-body").append("<input id\"alunoNome\" type='text' placeholder='Nome do aluno'></br>");
			$(".modal-body").append("<input id=\"nomeAluno\" type='text' class='senhaPass' placeholder='Nome'></br>");
			$(".modal-body").append("<label>Codigo RFID</label>");
			$(".modal-body").append("<input id=\"CodigoRFID\" type='text' class='senhaPass' placeholder='RFID'></br>");
			$(".modal-body").append("<label>Senha</label>");
			$(".modal-body").append("<input id=\"senhaAluno\" type='password' class='senhaPass' placeholder='Senha'></br>");
			$(".modal-body").append("<label>Confirmar senha</label>");
			$(".modal-body").append("<input type='password' class='senhaPass' placeholder='Senha'></br>");
			$(".modal-title").empty();
			$(".modal-title").append("Cadastro de alunos");
			$(".modal-footer").empty();
			$(".modal-footer").append("<button type='button' id=\"cadastrarNovoAluno\" class='btn btn-default'>Cadastrar</button>");
			$(".modal-footer").append("<button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>");
		});


		
		$("main").on("click",".nomeAlunos",function(){

			$(".modal-title").text("Horários");
			$(".modal-body").empty();
			$(".modal-body").text("Carregando...");
			nomeAlunoSelecionado = $(this).text();  
			$.get("http://botanicapp.com.br/cleyton/estagiarios/usuarios.php", {nome:nome,senha:senha,aluno:nomeAlunoSelecionado,comando:"horarios"}, function(resultado){
				dadosAluno = resultado;
				$(".modal-body").html();

				apresentaDadosDoAluno(dadosAluno);

				
			});

			$(".modal-footer").empty();
			$(".modal-footer").append("<label>Data:</label>");
			$(".modal-footer").append("<input id=\"diaExato\" type='date'/>");
			$(".modal-footer").append("<label>Hora:</label>");
			$(".modal-footer").append("<input placeholder=\"HH:MM\" id=\"horaExata\"type='text'/>");
			$(".modal-footer").append("<button type='button' id=\"cadastrarHorarioAluno\" class='btn btn-default' >Cadastrar</button>");
			$(".modal-footer").append("<button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>");
			
		});
		
		$(".formholder").on("click","#deletarAluno",function(){
			$(".modal-body").empty();
			$(".modal-footer").empty();
		});

});

function apresentaDadosDoAluno(dados, mes = 0){
	var selection = "<label>Mês: </label><select id=\"resposta\">"+
							"<option value=\"0\">-------</option>"+
							"<option value=\"1\">Janeiro</option>"+
			                "<option value=\"2\">Fevereiro</option>"+
			                "<option value=\"3\">Março</option>"+
			                "<option value=\"4\">Abril</option>"+  
			                "<option value=\"5\">Maio</option>"+  
			                "<option value=\"6\">Junho</option>"+
			                "<option value=\"7\">Julho</option>"+  
			                "<option value=\"8\">Agosto</option>"+
			                "<option value=\"9\">Setembro</option>"+  
			                "<option value=\"10\">Outubro</option>"+
			                "<option value=\"11\">Novembro</option>"+
			                "<option value=\"12\">Dezembro</option>"+  
			            "</select><input type=\"button\" id=\"recarregarHorarios\" width=\"19px\" height=\"19px\" value=\"Ok\">";

	//INICIA A TELA
	$(".modal-body").empty();
	$(".modal-body").append("<div class=\"usuario\"><div class=\"us1\">Usuário: <label>"+nomeAlunoSelecionado+"</label></div><div class=\"selection\">"+selection+"</div></div>");


	var totalHoras = [];
	$("#resposta").val(mes);
	
	var resultado = JSON.parse(dados);
	
	var diaMesAnterior = 0, numMesAnterior = 0, anoAnterior = 0, idAnterior = 0, ultimoMov = 0; 

	$.each(resultado,function(index, obj){
		if(index != 0 && index != 1){
			var gv2= JSON.parse(obj);
			
			if(parseInt(gv2.numMes) == parseInt(mes) || parseInt(mes) == 0){
				if(gv2.diaMes == diaMesAnterior && gv2.numMes == numMesAnterior && gv2.ano == anoAnterior){
					ultimoMov = ultimoMov * -1;
					if(ultimoMov == -1){
						$("#"+idAnterior).append("<tr  class='saiu'><td>Saiu :</td><td>"+gv2.hora+":"+gv2.minuto+"</td></tr>");
					}else{
						$("#"+idAnterior).append("<tr  class='entrou'><td>Entrou :</td><td>"+gv2.hora+":"+gv2.minuto+"</td></tr>");
					}
				}else{
					$(".modal-body").append("<table class=\"tabelaDias\" id=\""+(idAnterior+1)+"\"><tr class=\"tituloTabelasHorarios\"><th colspan=\"2\">"+gv2.diaMes+"/"+gv2.numMes+"/"+gv2.ano+"</th></tr><tr  class='entrou'><td>Entrou: </td><td>"+gv2.hora+":"+gv2.minuto+"</td></tr></table>");
					ultimoMov = 1;
					idAnterior++;
				}
				diaMesAnterior = gv2.diaMes; numMesAnterior = gv2.numMes; anoAnterior = gv2.ano;
			}
		}
	});
	
	var i = 1;
	var j = 1;
	
	for( i=1;i<=idAnterior;i++){
		var minutosTotal = 0;
		for(j = 2; j<=(($("#"+i+" tr").length));j=j+2){
			
			var horaEntrada1 = $("#"+i+" :nth-child("+j+")").html();
			if(horaEntrada1 != null){
				var str1 = horaEntrada1.split("<td>");
				str2 = str1[2].replace("</td>", "");
				
				var array2 = str2.split(":");
				var horaEntrada = array2[0];
				var minutoEntrada = array2[1];
			}
			
			var horaSaida1 = $("#"+i+" :nth-child("+(j+1)+")").html();
			if(horaSaida1 != null){
				var str3 = horaSaida1.split("<td>");
				var str2 = str3[2].replace("</td>", "");
				
				var array3 = str2.split(":");
				var horaSaida = array3[0];
				var minutoSaida = array3[1];
				//console.log(horaSaida+" e "+minutoSaida);
			}
			
			if(horaSaida1 !=null && horaEntrada1 != null){
				var total1 = parseInt((horaEntrada*60))+parseInt(minutoEntrada);
				var totalNeg = parseInt((horaSaida*60))+parseInt(minutoSaida);
				var totalNeg1 =  totalNeg - total1;
				minutosTotal = minutosTotal + totalNeg1;
			}
		}
		
		$("#"+i).append("<tr class=\"horasPorDia\"><td>Horas trabalhadas :</td><td>"+parseInt((minutosTotal)/60)+" h e "+((minutosTotal)%60)+" min</td></tr>");
		totalHoras[i] = minutosTotal;
	}
	//var horaEntrada = $("#1 :nth-child(2)").html();
	var totalHorasEstagio = 0;
	for (var i = totalHoras.length - 1; i > 0; i--) {
		totalHorasEstagio = totalHorasEstagio + totalHoras[i];
	}
	$(".modal-body").append("<div class=\"usuario\"><div class=\"us1\">Horas Total: "+parseInt((totalHorasEstagio)/60)+"</div></div>");
	
}

function telaProfessor(json){
	$("main").empty();
	var div = $("<div />").addClass("formholder").addClass("controleProfessor");
	$("main").addClass("controleProfessor");
	$("main").append(div);
	$(".formholder").empty();
	$(".formholder").append("<h4 id=\"nomeProfessor\">Olá ,professor <label>"+nome+"</label>!!!</h4>");
	$(".formholder").append("<div class='modal fade' id='myModal' role='dialog'></div>");
	$("#myModal").append("<div class='modal-dialog'></div>");
	$(".modal-dialog").append("<div class='modal-content'></div>");
	$(".modal-content").append("<div class='modal-header'></div>");
	$(".modal-header").append("<button type='button' class='close' data-dismiss='modal'>&times;</button>");
	$(".modal-header").append("<h4 class='modal-title'>Header</h4>");
	$(".modal-content").append("<div class='modal-body'></div>");
	$(".modal-body").append("<p>Some text in the modal.</p>");
	$(".modal-content").append("<div class='modal-footer'></div>");
	$(".modal-footer").append("<button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>");
	
	var alunosProfessor = $("<div class=\"lateral\"></div>").append("<h4 id=\"nomeAlunos\">Alunos:</h4>");
	
	//Apresentar os nomes dos usuarios

	
	var lista = $("<ul />");
	console.log(json);
	for (var i = json.length - 1; i >= 2; i--) {
		console.log(json[i]);
		var aluno = JSON.parse(json[i]);
		$(lista).append("<li class=\"nomeAlunos\" ><a data-toggle='modal' data-target='#myModal'>"+aluno.nome+"</a></li>");
	}

	var alunosProfessor = $(alunosProfessor).append(lista);

	var confsProfessor = $("<div class=\"lateral2\"></div>")
		.append("<button class=\"botProfessor\" id='ConfiguracoesProfessor' type='button' >Configuraões</button>")
		.append("<button class=\"botProfessor\" id='cadastrarAluno' type='button' >Cadastrar</button>")
		.append("<button class=\"botProfessor\" id='deletarAluno' type='button' >Sair</button>");
	
	$(".formholder").append(alunosProfessor);
	$(".formholder").append(confsProfessor);

}

