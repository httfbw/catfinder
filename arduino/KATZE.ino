  #include <ESP8266WiFi.h>
  
  const short int led=16; // LED_BUILTIN;
  void setup() {
  // put your setup code here, to run once:
  pinMode(led,OUTPUT); 
  Serial.begin(19200);
  Serial.println("catfinder");
  Serial.print("LED port: ");
  Serial.println(led);

  WiFi.begin("Freifunk","");
  while (WiFi.status()!=WL_CONNECTED){
    delay(500);
  }
  Serial.println("Verbunden");
}

int anzahl = 11;
float weg[22] = {48.778533, 9.277715,
                48.777765, 9.277794,
                48.777284, 9.278159,
                48.777263, 9.278277,
                48.776613, 9.278781,
                48.776210, 9.278792,
                48.776309, 9.278116,
                48.776309, 9.278116,
                48.776641, 9.276743,
                48.776761, 9.276356,
                48.777023, 9.275702};
int schritt = 0;

void loop() {
 // Daten senden
 WiFiClient cli;
 if (cli.connect("ploing.de",9000)){
   cli.print(String("POST /position") +
     "?lat=" + String(weg[schritt*2], 5) +
     "&lon=" + String(weg[schritt*2 + 1], 5) +
     " HTTP/1.1\r\n" +
     "Host: ploing.de:9000\r\n" +
     "Connection: close\r\n" +
     "\r\n");
   delay(250);
   cli.stop();
   Serial.println("Daten gesendet");
   schritt = schritt + 1;
   if (schritt>=anzahl) {
     schritt = 0;
   }
 }else{
  Serial.println ("verbindung zum server hatt nicht geklappt");
 }

 // Warten und blinken
 for(int i=0; i<80; i=i+1) {
   digitalWrite(led,HIGH);                                                   
   delay(500);
   digitalWrite(led,LOW);
   delay(250);
 }
} 
