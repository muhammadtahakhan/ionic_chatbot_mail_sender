<!-- to build signed apk -->
https://angularfirebase.com/snippets/deploying-ionic4-to-android-and-google-play/

0.0)ionic cordova build android --prod --release

0.1)jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.jks C:\Users\taha\Desktop\ionic_chatbot_mail_sender\App\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk my-alias

1) C:\Users\taha\AppData\Local\Android\Sdk\build-tools\28.0.3> .\zipalign -v 4 C:\Users\taha\Desktop\ionic_chatbot_mail_sender\App\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk ee_mail-Release.apk