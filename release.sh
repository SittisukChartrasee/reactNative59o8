#!/bin/sh

yarn build-ios && yarn build-android
read -p "Enter Your ENV: "  env
read -p "Enter Your build: "  build

DATE=$(date +'%m%d%Y')
NAME=onboarding-$build-$DATE-$env
mkdir release/"$NAME"

cp android/app/src/main/assets/index.android.bundle release/$NAME
cp ios/main.jsbundle release/$NAME

echo "{\"nameFile\": \"${NAME}\", \"env\": \"${env}\", \"build\": \"${build}\", \"time\": \"${DATE}\"}" > release/releaseApp.json

echo "Created $NAME file"  


