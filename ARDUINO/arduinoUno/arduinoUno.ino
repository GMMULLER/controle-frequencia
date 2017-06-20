#include <Ethernet.h>

//Configurações da rede local e estabelecimento do ip destino
byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
byte ip[] = { ***, ***, ***, *** };
byte es[] = { 8, 8, 8, 8 };
byte gateway[] = { ***, ***, ***, *** };
byte subnet[] = { 255, 255, 252, 0 };
byte server[] = { ***, ***, ***, *** };

EthernetClient client;

void setup()
{
  Ethernet.begin(mac, ip, es, gateway, subnet); 
  Serial.begin(9600);

  //Verifica se a conexão com o server é possível
  if (client.connect(server, 80)) {
    Serial.println("connected");
    client.println("GET /cleyton/estagiarios/acesso.php?id=****&cod=**** HTTP/1.0");
    client.println();
    delay(3000);
  } else {
    Serial.println("connection failed");
    delay(3000);
  }
 
}

void loop()
{
  //Printando informação recebida do server
  if (client.available()) {
    char c = client.read();
    Serial.print(c);
  }

  if (!client.connected()) {
    Serial.println();
    Serial.println("disconnecting.");
    client.stop();
    //for(;;)
    //  ;
  }

  //Verifica se está recebendo alguma coisa do Arduino Nano e guarda as informações
  if(Serial.available()>0){
    String a = Serial.readString(); 
    String b = a.substring(0,2);
    String c = a.substring(3,5);
    String d = a.substring(6,8);
    String e = a.substring(9,11);
    String dado = b+"%20"+c+"%20"+d+"%20"+e;
    enviaDado(dado);  
  }
  
}

//Envia os dados coletados para o server
int enviaDado(String id){
  Serial.println("connecting...");
  if (client.connect(server, 80)) {
    Serial.println("connected");
    client.println("GET /cleyton/estagiarios/novoAcesso.php?id="+id+"&cod=***** HTTP/1.0"); //perceptron.php?id=*****
    client.println();
    client.stop();  
  } else {
    Serial.println("connection failed");
  }
  delay(4900);
}
