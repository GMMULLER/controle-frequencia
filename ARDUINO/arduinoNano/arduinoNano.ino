#include <MFRC522.h>

String data;

//Definição dos pinos do sensor RFID
#define SS_PIN 10
#define RST_PIN 9
MFRC522 mfrc522(SS_PIN, RST_PIN);
 
void setup()
{
   
  Serial.begin(9600);

  mfrc522.PCD_Init();
  
}
 
void loop()
{
  if( ! mfrc522.PICC_IsNewCardPresent()){
    return;
  }
  // Seleciona um dos cartões
  if( ! mfrc522.PICC_ReadCardSerial()){
    return;
  }
  String conteudo= "";
  byte letra;
  //Concatenação dos dados lidos dos cartões em Hexadecimal
  for (byte i = 0; i < mfrc522.uid.size; i++) 
  {
     conteudo.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " "));
     conteudo.concat(String(mfrc522.uid.uidByte[i], HEX));
  }
  conteudo.toUpperCase();
  //Verifica se os dados lidos são válidos, se sim os manda para o Arduino Uno
  if(conteudo.substring(1)!=""){
    Serial.print(conteudo.substring(1));
    delay(1000);
  }
}
