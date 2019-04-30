https://stackoverflow.com/questions/44446523/unable-to-load-script-from-assets-index-android-bundle-on-windows

https://stackoverflow.com/questions/32634352/react-native-android-build-failed-sdk-location-not-found

For creating theme in app: https://github.com/GeekyAnts/native-base-docs/blob/master/docs/customize/SetUp.md

set env veriables: (you and find sdk link from android-studio) 
export ANDROID_HOME=/home/taha/Android/Sdk 
export PATH=$ANDROID_HOME/tools:$PATH 
export PATH=$ANDROID_HOME/platform-tools:$PATH 
export PATH=$ANDROID_HOME/build-tools/23.0.1:$PATH

for create signed APK cd android && ./gradlew assembleRelease