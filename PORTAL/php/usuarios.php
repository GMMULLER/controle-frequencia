<?php
	$nome = "'".$_GET['nome']."'";
	$senha = "'".$_GET['senha']."'";
	$num = 17;
	$usuario = new Usuarios();
	$aluno = $usuario->getAcessos($nome, $senha);
	echo "$aluno";

	class Usuarios{
	    private $servername = "localhost";
		private $username = "cleyton";
		private $password = "tip122";
		private $dbname = "exps2017";
		private $table1 = "mentor";
		private $table2 = "senhaEstagios";
	     
	    public function alunoOuMentor($nome, $senha){
	    	$conn = mysqli_connect($this->servername,$this->username,$this->password,$this->dbname) or die('Erro ao conectar ao banco de dados');

	    	//table de alunos
	        $sql1 = "SELECT id FROM ".$this->table2." where nome=".$nome." AND senha=".$senha."";
			$result1 = mysqli_query($conn, $sql1);

			//tabela de mentores
			$sql2 = "SELECT codigo_mentor FROM ".$this->table1." where nome=".$nome." AND senha=".$senha."";
			$result2 = mysqli_query($conn, $sql2);

			if (mysqli_num_rows($result1) > 0) {
				// output data of each row
				mysqli_close($conn);
				return 1;
				
			} else if(mysqli_num_rows($result2) > 0){
				mysqli_close($conn);
				return 2;
			}else{
				mysqli_close($conn);
				return 0;
			}

	    }
	    public function getAlunosProfessor($nome, $senha){
	    	$conn = mysqli_connect($this->servername,$this->username,$this->password,$this->dbname) or die('Erro ao conectar ao banco de dados');

	    	$sql1 = "SELECT codigo_mentor FROM ".$this->table1." where nome=".$nome." AND senha=".$senha."";
			
			$result1 = mysqli_query($conn, $sql1);

			if (mysqli_num_rows($result1) > 0) {
				// output data of each row
				while($row = mysqli_fetch_assoc($result1)) {
					$sql2 = "SELECT nome, id FROM ".$this->table2." where cod_mentor=".$row["codigo_mentor"];

					$result2 = mysqli_query($conn, $sql2);
					
					echo "$sql2";

					if (mysqli_num_rows($result2) > 0) {
						while($row1 = mysqli_fetch_assoc($result2)) {
							$arr = array('nome'=>$row1["nome"], 'id' => $row1["id"]);
							echo "$arr";
							$array[] = json_encode($arr);
						}
					} else {
						echo "Nenhum dado";
					}
					return json_encode($array);
				}
			} else {
				echo "0";
			}	
	    }

	    public function retiraAluno($codigo_aluno, $nome, $senha){
	    	$conn = mysqli_connect($this->servername,$this->username,$this->password,$this->dbname) or die('Erro ao conectar ao banco de dados');

	    	$sql1 = "SELECT codigo_mentor FROM ".$this->table1." where nome=".$nome." AND senha=".$senha."";
			
			$result1 = mysqli_query($conn, $sql1);

			if (mysqli_num_rows($result1) > 0) {
				// output data of each row
				while($row = mysqli_fetch_assoc($result1)) {
					$sql2 = "delete FROM ".$this->table2." where codigo_aluno=".$codigo_aluno." and cod_mentor=".$row["codigo_mentor"];

					$result2 = mysqli_query($conn, $sql2);
					
					echo "$sql2";
				}
			} else {
				echo "0";
			}	
	    }

	    public function getAcessos($nome, $senha){
	    	$array[] = 1;

			$conn = mysqli_connect($this->servername,$this->username,$this->password,$this->dbname) or die('Erro ao conectar ao banco de dados');

		
			// Check connection
			if (!$conn) {
				die("Connection failed: " . mysqli_connect_error());
			}

			$sql = "SELECT id FROM ".$this->table2." where nome=".$nome." AND senha=".$senha."";
			$result1 = mysqli_query($conn, $sql);

			if (mysqli_num_rows($result1) > 0) {
				// output data of each row
				while($row = mysqli_fetch_assoc($result1)) {
					$sql = "SELECT * FROM acessos where id='".$row["id"]."' order by ano asc, numMes asc, diaMes asc, hora asc";
					$result2 = mysqli_query($conn, $sql);
				
					if (mysqli_num_rows($result2) > 0) {
						// output data of each row
						while($row2 = mysqli_fetch_assoc($result2)) {
							$arr = array('minuto' => $row2["minuto"], 'hora' => $row2["hora"], 'diaMes' => $row2["diaMes"], 'numMes' => $row2["numMes"], 'ano' => $row2["ano"]);
							$array[] = json_encode($arr);
						}
					} else {
						return "Nenhum dado";
					}
					return json_encode($array);
				}
			} else {
				return "0";
			}	
	    }
	    
	}

?>