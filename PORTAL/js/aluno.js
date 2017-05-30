function telaAluno(resultado, nome){
	$("#atualizar").removeClass("desaparecer");
	
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
							            "</select><img src=\"refresh.png\" id=\"refresh\" width=\"22px\" height=\"22px\" >";

	//INICIA A TELA
	$("main").empty();
	$("main").append("<div class=\"usuario\"><div class=\"us1\">Usuário: "+nome+"</div><div class=\"selection\">"+selection+"</div></div>");


	var totalHoras = [];
	var mes = $("#resposta").val();

	var diaMesAnterior = 0, numMesAnterior = 0, anoAnterior = 0, idAnterior = 0, ultimoMov = 0; 
	var gv = JSON.parse(resultado);
	$.each(gv,function(index, obj){
		if(index != 0){
			var gv2 = JSON.parse(obj);
			
			if(parseInt(gv2.numMes) == parseInt(mes) || parseInt(mes) == 0){
				if(gv2.diaMes == diaMesAnterior && gv2.numMes == numMesAnterior && gv2.ano == anoAnterior){
					ultimoMov = ultimoMov * -1;
					if(ultimoMov == -1){
						$("#"+idAnterior).append("<tr  class='saiu'><td>Saiu :</td><td>"+gv2.hora+":"+gv2.minuto+"</td></tr>");
					}else{
						$("#"+idAnterior).append("<tr  class='entrou'><td>Entrou :</td><td>"+gv2.hora+":"+gv2.minuto+"</td></tr>");
					}
				}else{
					$("main").append("<table id=\""+(idAnterior+1)+"\"><tr class=\"titulo\"><th colspan=\"2\">"+gv2.diaMes+"/"+gv2.numMes+"/"+gv2.ano+"</th></tr><tr  class='entrou'><td>Entrou: </td><td>"+gv2.hora+":"+gv2.minuto+"</td></tr></table>");
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
	$("main").append("<div class=\"usuario\"><div class=\"us1\">Horas Total: "+parseInt((totalHorasEstagio)/60)+"</div></div>");
	
			
};

