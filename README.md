
########### JMES Upstart Guide ###########

1) After cloning repository locally 
2) Install dependencies with 'yarn install'
3) Launch the application via 'yarn start or npm start'
    - this will prompt you to choose the environment you wish to run the application (ios, android, web)
    - make your selection to proceed
4) Your application should be up and running at this point.
5) Open an additional terminal and run 'npm run server' to launch the 'json-server' that is used to mock communications
5) Next register a username with the randomly created mnemonic (be sure to save this mnemonic as it will be used to login)
    - Your credentials will be saved in local storage and you will auto login
6) Once logged in you are greeted with your profile view and then able to navigate between pages
7) Sending JMES to other users will be simulated via 'json-server' mock server that is run at the time of launch.

TODO:
    - Add additional validations when sending and receiving JMES 
    - update DB & interface to reflect users balance after a transaction has occurred
