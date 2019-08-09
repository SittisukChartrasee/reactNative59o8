#!/bin/sh

choose=""
keyDrive=1U0T-es67ZV2hKdb0BxzbL-3HqxmKC4AR

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
        echo
        echo "SET ENV -> DEV"
        env="DEV"
        break;;
      '2')
        echo
        echo "SET ENV -> SIT"
        env="SIT"
        break;;
      '3')
        echo
        echo "SET ENV -> UAT"
        env="UAT"
        break;;
      '4')
        echo
        echo "SET ENV -> PRO"
        env="PRO"
        break;;
      'q')
        echo
        echo "quiting!";;
      *)   echo "This item is not available; try again!";;
  esac
done

read -p "Enter Your build: "  build

DATE=$(date +'%m%d%Y')
NAME=onboarding-$build-$DATE-$env
mkdir release/$NAME

echo "{\"nameFile\": \"${NAME}\", \"env\": \"${env}\", \"build\": \"${build}\", \"time\": \"${DATE}\"}" > release/releaseApp.json

yarn build-ios && yarn build-android

cp android/app/src/main/assets/index.android.bundle release/$NAME
cp ios/main.jsbundle release/$NAME

gdrive sync upload --delete-extraneous --keep-local release $keyDrive

echo 
echo "************** $env **************"
echo 
echo "share this link !!"
gdrive info $keyDrive | grep 'ViewUrl' | sed 's/ViewUrl: //'
echo 
echo "Created $NAME file successfully!"
echo 
echo "*********************************"
echo 
