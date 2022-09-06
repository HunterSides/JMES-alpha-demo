
## JMES Start Guide

  1. Clone this repo
  2. Install dependencies via 'yarn install or npm install'
  3. Launch app via 'yarn start or npm start' and choose the environment you wish to run the application in
  4. Open additional terminal and run 'npm run server' to launch mock server hosted at 'localhost:3000'
  5. Register username with the randomly created mnemonic 
      - be sure to save this mnemonic as it will be used to login
      - Your credentials will be saved in local storage and you will auto login upon page load
  6. Once logged in you are greeted with your profile view and then able to navigate between pages

### TODO:
## 🧱 Features
  1. Implement QR code generation and scanning
## 🗃️ State Management
  1. Implement server cache state (state from the server which is cached on the client for further usage)
     - [react-query](https://react-query.tanstack.com/) - REST + GraphQL
     - [swr](https://swr.vercel.app/) - REST + GraphQL
     - [apollo client](https://www.apollographql.com/) - GraphQL
     - [urql](https://formidable.com/open-source/urql/) - GraphQl 
## 📡 API Layer
  1. Use pre configured single instance of API client
      - [axios](https://github.com/axios/axios)
      - [graphql-request](https://github.com/prisma-labs/graphql-request)
      - [apollo-client](https://www.apollographql.com/docs/react/))
  2. Define and export request declarations
      - [react-query](https://react-query.tanstack.com/)
      - [apollo-client](https://www.apollographql.com/docs/react/)
      - [urql](https://formidable.com/open-source/urql/)
  3. Implement additional validations when sending and receiving JMES
## 💻 UI/UX
  1. Update DB & interface to reflect users balance after transaction occurrence
  2. Implement prevent default react component behaviour
## 🌐 Deployment & Config
  1. Implement concurrent server and application deployment
## License

[MIT](https://choosealicense.com/licenses/mit/)