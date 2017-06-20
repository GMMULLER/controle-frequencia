var dadosObtidos;
$(function(){
	$("main").on("click", "#atualizarMesAluno", function(){
		var mes = $("#resposta").val();
		telaAluno(dadosObtidos, nome, mes);
	});
	$("main").on("click", "#novaSenha", function(){
		$(".modal-title").text("Comfigurações de Segurança");
		$(".modal-body").empty();
		$(".modal-body").append("<label>Senha Atual</label>");
		$(".modal-body").append("<input id=\"senhaAluno\" type='password' class='senhaPass' placeholder='Senha'></br>");
		$(".modal-body").append("<label>Nova Senha</label>");
		$(".modal-body").append("<input id=\"senhaAluno\" type='password' class='senhaPass' placeholder='Senha'></br>");
		$(".modal-body").append("<label>Confirmar Nova Senha</label>");
		$(".modal-body").append("<input type='password' class='senhaPass' placeholder='Senha'></br>");
		$(".modal-footer").empty();
		$(".modal-footer").append("<button type='button' id=\"trocarSenhaAluno\" class='btn btn-default'>Confirmar</button>");
		$(".modal-footer").append("<button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>");
	});
	$("main").on("click", "#ajudaAluno", function(){
		$(".modal-title").text("Ajuda");
		$(".modal-body").empty();
		$(".modal-body").append("<a id='horario'>Como ver meus horários</a><br>");
		$(".modal-body").append("<a id='deslogar'>Como deslogar</a><br>");
		$(".modal-body").append("<a id='trocarSenha'>Como trocar de senha</a><br>");
		$(".modal-body").append("<a id='baterCartao'>Esqueci de bater o cartão</a><br>");
		$(".modal-body").append("<a id='problema'>Detectei um problema</a><br>");
		$(".modal-footer").empty();
		$(".modal-footer").append("<button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>");
	});
	
	$("main").on("click", "#horario", function(){
		
		$(".modal-title").empty();
		$(".modal-title").text("Como ver meus horários");
		$(".modal-body").empty();
		$(".modal-body").text("Escolha o mês desejado para ver os horários referentes àquele mês, ou Geral, para ver todos os dias, independente do mês.");
		
	});
	
	$("main").on("click", "#deslogar", function(){
		
		$(".modal-title").empty();
		$(".modal-title").text("Como deslogar");
		$(".modal-body").empty();
		$(".modal-body").text("Clique na opção 'Sair', localizada embaixo do botão 'Ajuda'.");
		
	});
	
	$("main").on("click", "#trocarSenha", function(){
		
		$(".modal-title").empty();
		$(".modal-title").text("Como trocar de senha");
		$(".modal-body").empty();
		$(".modal-body").text("Clique na opção 'Nova senha' e preencha os campos que aparecerão com sua senha atual, e sua senha nova duas vezes.");
		
	});
	
	$("main").on("click", "#baterCartao", function(){
		
		$(".modal-title").empty();
		$(".modal-title").text("Esqueci de bater o cartão");
		$(".modal-body").empty();
		$(".modal-body").text("Avise seu orientador para que mude no sistema.");
		
	});
	
	$("main").on("click", "#problema", function(){
		
		$(".modal-title").empty();
		$(".modal-title").text("Detectei um problema");
		$(".modal-body").empty();
		$(".modal-body").text("Não gostou faz melhor!");
		
	});

});

function telaAluno(resultado, nome, mes = 0){
	dadosObtidos = resultado;
	$("main").empty();

	//INICIA A TELA
	iniciaTelaAluno(resultado, nome, mes);

			
};

function iniciaTelaAluno(resultado, nome, mes){

	var selection = "<label>Mês: </label><select id=\"resposta\">"+
											"<option value=\"0\">---*Geral*---</option>"+
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
							            "</select><input type=\"button\" value=\"Ok\" id=\"atualizarMesAluno\" width=\"10px\" height=\"10px\">";


	//Acrescenta os dados do usuário na página
	var divDadosUsuario = $("<div />").addClass("dadosUsuario");
	$("main").append(divDadosUsuario);

	var topoPagina = "<div class=\"usuario\" id=\"usuarioInfo1\" >Bem-vindo, "+nome+"!!!</div><br>";
	$(".dadosUsuario").append(topoPagina);

	$(".dadosUsuario").append("<div class='modal fade' id='myModal' role='dialog'></div>");
	$("#myModal").append("<div class='modal-dialog'></div>");
	$(".modal-dialog").append("<div class='modal-content'></div>");
	$(".modal-content").append("<div class='modal-header'></div>");
	$(".modal-header").append("<button type='button' class='close' data-dismiss='modal'>&times;</button>");
	$(".modal-header").append("<h4 class='modal-title'>Header</h4>");
	$(".modal-content").append("<div class='modal-body'></div>");
	$(".modal-body").append("<p>Some text in the modal.</p>");
	$(".modal-content").append("<div class='modal-footer'></div>");
	$(".modal-footer").append("<button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>");
	

	var opcoesUsuario = $("<div />").addClass("opcoesUsuario");
	$(".dadosUsuario").append(opcoesUsuario);
	$(".opcoesUsuario").append("<a data-toggle=\"modal\" data-target=\"#myModal\" id=\"novaSenha\" >Nova Senha</a><br>");
	$(".opcoesUsuario").append("<a data-toggle=\"modal\" data-target=\"#myModal\" id=\"ajudaAluno\" >Ajuda</a><br>");
	$(".opcoesUsuario").append("<a id=\"sair\" href=\"index.html\" >Sair</a><br>");
	$(".dadosUsuario").append("<br>");

	var mesHoras = $("<div />").addClass("mesHoras");
	$(".dadosUsuario").append(mesHoras);
	$(mesHoras).append("<div id=\"selecionaMes\">"+selection+"</div>");
	$(mesHoras).append("<div id=\"horasTotalDeEstagio\" ></div>");
	$("#resposta").val(mes);

	
	//Printa os dias que bateu o cartão e calcula o total de horas realizado
	totalHorasEstagio = insereHoraEstagio(resultado);

	//Acrescenta no menu de usuário o total de horas referente ao mês
	$("#horasTotalDeEstagio").text("Horas: "+parseInt((totalHorasEstagio)/60));
		
}

function insereHoraEstagio(resultado){
	var totalHoras = [];
	var mes = $("#resposta").val();

	var diaMesAnterior = 0, numMesAnterior = 0, anoAnterior = 0, idAnterior = 0, ultimoMov = 0; 
	
	var secao = $("<section />").addClass("folhaDeEstagio");
	$("main").append(secao);

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
					$(".folhaDeEstagio").append("<table class=\"diaEstagiado\" id=\""+(idAnterior+1)+"\"><tr class=\"tituloDosDias\"><th colspan=\"2\">"+gv2.diaMes+"/"+gv2.numMes+"/"+gv2.ano+"</th></tr><tr  class='entrou'><td>Entrou: </td><td>"+gv2.hora+":"+gv2.minuto+"</td></tr></table>");
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

	return totalHorasEstagio;
}

