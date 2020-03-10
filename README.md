# REST API: Franle

## Implemented making use of:

+ NodeJS
+ Mongoose

### Usage:

Install all necessary dependencies with `npm install`

Run with `npm start`

### Object Schemas

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
