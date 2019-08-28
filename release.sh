#!/bin/sh

rootPath=$PWD
choose=""
apkChoose=""
KEYTEST=1k8oqUFNDixldtDmsr-nYMLCFAnpeQNkd
KEYTEST_APK=1BWmdG5PlK_6nV0yhHW89RyACBqh2KuBG

KEY=1hl_mGXBBevrMowOSoDLxJOPMtyqZ_btW
KEY_APK=1-q2EScI8LqFkYhGVlMDsy3hXHHgT6H0c

while [ "$choose" != "q" ]
do
  echo
  echo "1) DEV"
  echo "2) SIT"
  echo "3) UAT"
  echo "4) PRO"
  echo

  read -p "choose index your env: "  choose

  case $choose in
      '1') 
        echo "seted DEV"
        env="DEV"
        break;;
      '2')
        echo "seted SIT"
        env="SIT"
        break;;
      '3')
        echo "seted UAT"
        env="UAT"
        break;;
      '4')
        echo "seted PRO"
        env="PRO"
        break;;
      'q')
        echo
        echo "quiting!";;
      *)   echo "This item is not available; try again!";;
  esac
done

read -p "Enter Your build: "  build

echo "What you want to build apk y or n"

read apkChoose

# ******** create file env ******** #

DATE=$(date +'%Y%m%d')

NAME=onboarding-$build-$DATE-$env

echo "{\"nameFile\": \"${NAME}\", \"env\": \"${env}\", \"build\": \"${build}\", \"time\": \"${DATE}$(date +'%H%M')\"}" > release/releaseApp.json

yarn build-ios && yarn build-android

mkdir -p release/apk/$NAME

mkdir -p release/bundle/$NAME

# ******** copy path to release ******** #

if [ "$apkChoose" = "y" ]; then
  cd android && ./gradlew assembleRelease && cp $rootPath/android/app/build/outputs/apk/release/app-release.apk $rootPath/release/apk/$NAME
fi

cp $rootPath/android/app/src/main/assets/index.android.bundle $rootPath/release/bundle/$NAME
cp $rootPath/ios/main.jsbundle $rootPath/release/bundle/$NAME

# ******** push build to Gdrive ******** #

gdrive sync upload --delete-extraneous --keep-local $rootPath/release/bundle $KEY
if [ "$apkChoose" = "y" ]; then
  gdrive sync upload --delete-extraneous --keep-local $rootPath/release/apk $KEY_APK  
fi

echo 
echo "************** $env **************"
echo 
echo "share this link bundle !!"
gdrive info $KEY | grep 'ViewUrl' | sed 's/ViewUrl: //'
echo "share this link apk !!"
gdrive info $KEY_APK | grep 'ViewUrl' | sed 's/ViewUrl: //'
echo 
echo "Created $NAME file successfully!"
echo 
echo "*********************************"
echo 
