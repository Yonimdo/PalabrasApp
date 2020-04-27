

# Palabras App

    Created with Firebase, Redux and React native, this app creates a basic login with redux for devices, ANDROID/WEB.
    It holds 3 Basic "Apps".
    1. The App folder is the Expo React-native Redux home,  
    2. The Firebase folder For the firebase functions and public folder,  
    3. The Scripts folder for npm scrips,


#### Installating

    You will need to have firebase-cli, Expo-cli installed 
    
    run command `npm install`  (this will take a while and should install in all folders)

    Put the correct content in the google** files

    Put the Firebase Admin SDK data inside the googleaccount.json

    Update App/config.ts file to natch your credentials
    
    *After the change*

    If you don't want to commit your personal data Run the command  `git update-index --assume-unchanged .\googleaccount.json .\google-services-android-expo.json .\google-services-android-production.json .\App\config.ts`.

    npm start in base folder
