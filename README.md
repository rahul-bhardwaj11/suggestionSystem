A Simple web app that uses a web-component suggestion-Box which takes attributes for data api and page size and displays suggestions accordingly. Suggestion-Box can be embedded into other projects also directly by using html tag <suggestion-Box> and importing suggestion-Box.js in a script tag providing api for fetching data by setting apiEndPoint attributes. The api should be a Rest api that returns json array of data. api should be something like "http://localhost:3000/users?pageNo=1&size=4".


To run the app locally:

git clone

npm install

npm start
 
open http://localhost:3000/


