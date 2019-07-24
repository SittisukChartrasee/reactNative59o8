#!/bin/sh

# if [ -d "/release" ] 
# then
    read -p "Enter Your ENV: "  env
    read -p "Enter Your build: "  build

    DATE=$(date +'%m%d%Y')
    NAME=$build-$DATE-$env
    mkdir release/"$NAME"

    cp android/app/src/main/assets/index.android.bundle release/$NAME
    cp ios/main.jsbundle release/$NAME

    echo "Created $build-$DATE-$env file"
# else
#     mkdir release
#     echo "Created release directory file!!"
# fi



