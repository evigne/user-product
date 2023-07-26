<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

## Description

User Product Build Using [Nest](https://github.com/nestjs/nest) framework TypeScript and user GraphQL and TypeORM.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test
```

## Sample Query and Mutation

```bash
#Create a User
mutation{
createUser(createUserInput:{
  name:"Vignesh",
  email:"vignesh@mail.com",
  age:30
}){
  id
  name
  email
  age

}
}
```

```bash
#Get User
query{
  getUser{
    id
    name
    email
    age
    order{
      name
      id
    }
  }
}
```

```bash
#Create Product
mutation {
  createProduct(createProductInput: { name: "AirPods", price: 349.99 }) {
    id
    name
    price
  }
}
```

```bash
#Get Product
query{
  getProduct{
    id
    name
    price
  },
  getProductById(id:"435c1d1d-8302-4ec4-b76d-10baa0bc424f"){ #Sample id
    id
    name
    price
  }
}
```

```bash

#Add Products to User
mutation{
  addUserProduct(addUserProduct:{
    id:"0df9cbbd-97d5-4b51-bab2-c73bb6117f2a",
    order:[
      "458cde6f-2e5f-43b5-ade4-2f93c8a12433",
      "b8f51637-4385-454c-beaf-cbaca9d93dee",
    ]
  }){
    id
    name
    email
    age
    order{
      name
      price
    }

  }
}
```

## Stay in touch

- Author - [Vigneshwaran]
- LinkedIn - [https://nestjs.com](https://www.linkedin.com/in/e-vig/)

## License

Nest is [MIT licensed](LICENSE).
