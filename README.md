[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

User Product Build Using [Nest](https://github.com/nestjs/nest) framework TypeScript and uses GraphQL and TypeORM.

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
#TestSuites: User, Product
#Tests: Create User, Create Product and Add Products to User
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
- LinkedIn - [https://www.linkedin.com/in/e-vig/](https://www.linkedin.com/in/e-vig/)

## License

Nest is [MIT licensed](LICENSE).
