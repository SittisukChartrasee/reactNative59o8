#!/bin/sh

rootPath=$PWD
choose=""
apkChoose=""
KEYTEST=1k8oqUFNDixldtDmsr-nYMLCFAnpeQNkd
KEYTEST_APK=1BWmdG5PlK_6nV0yhHW89RyACBqh2KuBG

KEY=1hl_mGXBBevrMowOSoDLxJOPMtyqZ_btW
KEY_APK=1-q2EScI8LqFkYhGVlMDsy3hXHHgT6H0c


setColor() {
  red=`tput setaf 1`
  green=`tput setaf 2`
  reset=`tput sgr0`
  GET_TEXT_AFTER_FLAG=`echo $@ | cut -d ' ' -f 2-`

  if [ "$1" = "error" ]
  then
    echo "${red} $GET_TEXT_AFTER_FLAG ${reset}"
  else 
    echo "${green} $GET_TEXT_AFTER_FLAG ${reset}"
  fi
}

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
        setColor s "env to DEV"
        env="DEV"
        break;;
      '2')
        setColor s "env to SIT"
        env="SIT"
        break;;
      '3')
        setColor s "env to UAT"
        env="UAT"
        break;;
      '4')
        setColor s "env to PRO"
        env="PRO"
        break;;
      'q')
        echo
        echo "quiting!";;
      *)   echo "This item is not available; try again!";;
  esac
done

read -p "Enter Your build: "  build

setColor s "What you want to build apk y or n"

read apkChoose

# ******** create file env ******** #

DATE=$(date +'%Y%m%d')

NAME=onboarding-$build-$DATE-$env

if [ "$choose" = "4" ]; then
  modeDev="false"
else
  modeDev="true"
fi

echo "{\"nameFile\": \"${NAME}\", \"env\": \"${env}\", \"build\": \"${build}\", \"time\": \"${DATE}$(date +'%H%M')\", \"modeDev\": ${modeDev} }" > release/releaseApp.json

setColor s "init build bundle ..."
yarn build-ios && yarn build-android
setColor s "build bundle success"

mkdir -p release/apk/$NAME

mkdir -p release/bundle/$NAME

# ******** copy path to release ******** #

if [ "$apkChoose" = "y" ]; then
  setColor s "start build apk android"
  cd android && ./gradlew assembleRelease && cp $rootPath/android/app/build/outputs/apk/release/app-release.apk $rootPath/release/apk/$NAME
fi

cp $rootPath/android/app/src/main/assets/index.android.bundle $rootPath/release/bundle/$NAME
cp $rootPath/ios/main.jsbundle $rootPath/release/bundle/$NAME

# ******** push build to Gdrive ******** #

echo
setColor s "init upload bundle ..."
gdrive sync upload --delete-extraneous --keep-local $rootPath/release/bundle $KEY
setColor s "build upload bundle success"
if [ "$apkChoose" = "y" ]; then
  setColor s "init upload apk"
  gdrive sync upload --delete-extraneous --keep-local $rootPath/release/apk $KEY_APK
  setColor s "build upload apk success"
fi

linkBundle=$(gdrive info $KEY | grep 'ViewUrl' | sed 's/ViewUrl: //')
linkApk=$(gdrive info $KEY_APK | grep 'ViewUrl' | sed 's/ViewUrl: //')
green=`tput setaf 2`
reset=`tput sgr0`

echo 
setColor s "-------------- $env --------------"
echo 
setColor s "share this link bundle !!"
setColor error $linkBundle
setColor s "share this link apk !!"
setColor error $linkApk
echo " ${green}Created${reset} \033[33m$NAME\033[m ${green}file successfully!"
echo 
setColor s "---------------------------------"
echo 
