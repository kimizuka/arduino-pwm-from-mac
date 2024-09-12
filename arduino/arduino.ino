int p3 = 3;   // 3
int p5 = 5;   // 5
int p6 = 6;   // 6
int p9 = 9;   // 9
int p10 = 10; // A
int p11 = 11; // B
int p13 = 13; // D

int recieveByte = 0;
String buffer = "";

void setup() {
  Serial.begin(115200);
  pinMode(p3, OUTPUT);
  pinMode(p5, OUTPUT);
  pinMode(p6, OUTPUT);
  pinMode(p9, OUTPUT);
  pinMode(p10, OUTPUT);
  pinMode(p11, OUTPUT);
  pinMode(p13, OUTPUT);

  analogWrite(p3, 0);
  analogWrite(p5, 0);
  analogWrite(p6, 0);
  analogWrite(p9, 0);
  analogWrite(p10, 0);
  analogWrite(p11, 0);
  analogWrite(p13, 0);
}

void loop() {
  buffer = "";

  while (Serial.available() > 0) {
    recieveByte = Serial.read();

    if (recieveByte == (int)'\n') {
      break;
    }

    buffer.concat((char)recieveByte);
  }

  if (buffer.length() == 4) { // ex) A100 -> 10番ピンが100
    if (buffer[0] == '3') {
      int level = String(buffer[1]).toInt() * 100 + String(buffer[2]).toInt() * 10 + String(buffer[3]).toInt();
      
      if (level < 0) {
        level = 0;
      } else if (255 < level) {
        level = 255;
      }

      analogWrite(p3, level);
    } else if (buffer[0] == '5') {
      int level = String(buffer[1]).toInt() * 100 + String(buffer[2]).toInt() * 10 + String(buffer[3]).toInt();
      
      if (level < 0) {
        level = 0;
      } else if (255 < level) {
        level = 255;
      }

      analogWrite(p5, level);
    } else if (buffer[0] == '6') {
      int level = String(buffer[1]).toInt() * 100 + String(buffer[2]).toInt() * 10 + String(buffer[3]).toInt();
      
      if (level < 0) {
        level = 0;
      } else if (255 < level) {
        level = 255;
      }

      analogWrite(p6, level);
    } else if (buffer[0] == '9') {
      int level = String(buffer[1]).toInt() * 100 + String(buffer[2]).toInt() * 10 + String(buffer[3]).toInt();
      
      if (level < 0) {
        level = 0;
      } else if (255 < level) {
        level = 255;
      }

      analogWrite(p9, level);
    } else if (buffer[0] == 'A') {
      int level = String(buffer[1]).toInt() * 100 + String(buffer[2]).toInt() * 10 + String(buffer[3]).toInt();
      
      if (level < 0) {
        level = 0;
      } else if (255 < level) {
        level = 255;
      }

      analogWrite(p10, level);
    } else if (buffer[0] == 'B') {
      int level = String(buffer[1]).toInt() * 100 + String(buffer[2]).toInt() * 10 + String(buffer[3]).toInt();
      
      if (level < 0) {
        level = 0;
      } else if (255 < level) {
        level = 255;
      }

      analogWrite(p11, level);
    } else if (buffer[0] == 'D') {
      int level = String(buffer[1]).toInt() * 100 + String(buffer[2]).toInt() * 10 + String(buffer[3]).toInt();
      
      if (level < 0) {
        level = 0;
      } else if (255 < level) {
        level = 255;
      }
      
      analogWrite(p13, level);
    }
  }

  delay(1);
}
