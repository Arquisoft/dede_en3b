# Tests

For the tests on the RESTApi i've created a mock server that uses a MongoDb database in memory database to ensure that the tests are executed in a controlled environment.

## What is used.
  - **mongodb-memory-server**: a memory instance of a mongo database. It works like the database we have remotely
  - **express**: since express handles all the backend operations we need it here as well.
  - **mongoose**: mongoose is needed to connect to the instance of the database that we have in memory.
  - **cors**: Cross Origin Resource Sharing.
 
 ## How it works.
 
 It is rather simple.
  - **startDB**: creates the instance in memory on which the tests are going to be ran. Called from the BeforeAll method in api.test.ts
  - **startServer**: creates the development server to which we will make the petitions to, it connects to the database and sets the port to 5000 as with the real app. Called from the BeforeAll method in api.test.ts
  - **closeServer**: A function that is to be called when all the tests are ran or after each of the tests depending if the state of the database changes and hinders other test cases. Called from the BeforeAll method in api.test.ts
  - **closeDB**: as its name implies it close the connection to the in memory database. Called from the AfterAll method in api.test.ts
  - **addProducts**: it creates a new collection of products and adds the sample data to the database. Called from the BeforeAll method in api.test.ts
 
 The sample data will be exported so that we can be sure that the api calls work properly, returning all the necesary data. If more data were needed it would all be a matter of adding it to the test.server.ts file.
