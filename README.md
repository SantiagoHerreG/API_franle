# REST API: Franle

### Share and learn languages anonymously. The API REST is the web service to interact between the mobile app and the MONGODB database. This project is part of Holberton School (9 months foundations) coursework.

## Implemented making use of:

+ NodeJS (JavaScript package)
+ Mongoose (Object Data Model)
+ Express (Application server- router)
+ Mocha (Testing)
+ Chai (Assertions)

### Installation:

Clone the repo with `git clone [path]`
Install all necessary dependencies with `npm install`

### Usage

Run with `npm start`

Run tests with `npm test`

#### Users:

Endpoints:

+ /users [GET]

+ /users [POST] data = {username, password, age, devices}

+ /users/:username [GET]

+ /users/:username [PUT] data = {[username], [password], [age], [devices]}

+ /users/:username [DELETE]

#### Chats:

Endpoints:

+ /chats [POST] data = {usernameA, usernameB}

+ /chats/:chatId [GET]

+ /chats/:chatId [DELETE]

#### Message:

Endpoints:

+ /message/:chatId [POST] data = {[message], username}

### Contributing:
+ Santiago Herrera
+ Juan Diego Arango
+ Dario Castañeda

### Related projects:

This API REST is part of the Franle mobile app development.
git clone `https://github.com/jdarangop/franle_app.git`
