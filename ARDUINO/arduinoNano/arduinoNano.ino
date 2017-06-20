#include <MFRC522.h>

String data;

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
  // Select one of the cards
  if( ! mfrc522.PICC_ReadCardSerial()){
    return;
  }
  String conteudo= "";
  byte letra;
  for (byte i = 0; i < mfrc522.uid.size; i++) 
  {
     conteudo.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " "));
     conteudo.concat(String(mfrc522.uid.uidByte[i], HEX));
  }
  conteudo.toUpperCase();
  if(conteudo.substring(1)!=""){
    Serial.print(conteudo.substring(1));
    delay(1000);
  }
}
