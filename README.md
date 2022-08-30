
########### JMES Upstart Guide ###########

1) After cloning repository locally, make sure you switch to the 'alpha-demo' branch to have access to the application. 
2) Install dependencies with 'yarn install'
3) Launch the application via 'yarn start or npm start'
    - this will prompt you to choose the environment you wish to run the application (ios, android, web)
    - make your selection to proceed
4) Your application should be up and running at this point.
5) Next register a username with the randomly created mnemonic (be sure to save this mnemonic as it will be used to login)
6) Your credentials will be saved in local storage and you will auto login
7) Once logged in you are greeted with your profile view and then able to navigate between pages
8) Sending JMES to other users will be simulated via 'json-server' mock server that is ran at the time of launch.