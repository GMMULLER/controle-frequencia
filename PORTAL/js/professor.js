$(function(){
	$("#professor").click(function(){
		$(".formholder").empty();
		$(".formholder").append("<h4>Professor:<label></label></h4>");
		$(".formholder").append("<h4>Alunos:</h4>");
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
		$(".formholder").append("<ul><li><a data-toggle='modal' data-target='#myModal'>Gustavo</a></li><li><a data-toggle='modal' data-target='#myModal'>Lucio</a></li><li><a data-toggle='modal' data-target='#myModal'>Cleyton</a></li></ul>");
		$(".formholder").append("<button id='cadastrar' type='button' data-toggle='modal' data-target='#myModal'>Cadastrar aluno</button>");
		$(".formholder").append("<button id='deletar' type='button' data-toggle='modal' data-target='#myModal'>Deletar aluno</button>");
	});
		$(".formholder").on("click","#cadastrar",function(){
			$(".modal-body").empty();
			$(".modal-body").append("<label>Aluno:</label>");
			$(".modal-body").append("<input type='text' placeholder='Nome do aluno'></br>");
			$(".modal-body").append("<label>Senha:</label>");
			$(".modal-body").append("<input type='password' class='senhaPass' placeholder='Senha'></br>");
			$(".modal-body").append("<label>Confirmar senha:</label>");
			$(".modal-body").append("<input type='password' class='senhaPass' placeholder='Senha'></br>");
			$(".modal-body").append("<label>RFID Code:</label>");
			$(".modal-body").append("<input type='text' class='rfidcode' placeholder='Code'></br>");
			$(".modal-title").empty();
			$(".modal-title").append("Cadastro de alunos");
			$(".modal-footer").empty();
			$(".modal-footer").append("<button type='button' class='btn btn-default'>Cadastrar</button>");
			$(".modal-footer").append("<button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>");
		});
		
		$(".formholder").on("click","li",function(){
			$(".modal-title").text("Horários");
			$(".modal-body").empty();
			$(".modal-footer").empty();
			$(".modal-footer").append("<label>Data:</label>");
			$(".modal-footer").append("<input type='date'/>");
			$(".modal-footer").append("<label>Hora:</label>");
			$(".modal-footer").append("<input type='text'/>");
			$(".modal-footer").append("<button type='button' class='btn btn-default' >Cadastrar</button>");
			$(".modal-footer").append("<button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>");
			
		});
		
		$(".formholder").on("click","#deletar",function(){
			$(".modal-body").empty();
			$(".modal-title").text("Deletar aluno");
			$(".modal-footer").empty();
			$(".modal-footer").append("<button type='button' class='btn btn-default'>Deletar</button>");
			$(".modal-footer").append("<button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>");
		});

});