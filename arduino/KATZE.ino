  #include <ESP8266WiFi.h>
  
  const short int led=16; // LED_BUILTIN;
  void setup() {
  // put your setup code here, to run once:
  pinMode(led,OUTPUT); 
  Serial.begin(19200);
  Serial.println("Blinken");
  Serial.print("LED port: ");
  Serial.println(led);

  WiFi.begin("Freifunk","");
  while (WiFi.status()!=WL_CONNECTED){
    delay(500);
  }
  Serial.println("Verbunden");
}

void loop() {
 digitalWrite(led,HIGH);                                                   
 delay(500);
 digitalWrite(led,LOW);
 delay(250);
 
  // put your main code here, to run repeatedly:

} 
