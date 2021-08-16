# learning_graphQL
All about learning and experimenting with graphQL!

An abridged version of the Pet Store API was created (https://petstore3.swagger.io/). I made sure to cover all the different types of operations supported in that API.

## Instructions:
1. Run `npm install` in the root directory of the project.
2. Run `node server.js` in the root directory to the start the server.
3. Navigate to [http://localhost:3000/graphql](http://localhost:3000/graphql).
4. Explore the queries located in the queries.txt file. Also explore the documentation on the right hand side of the header.

## API requirements:
1. Add message validation
	* Message validation is largely handled by GraphQL because it is strongly-typed. 

2. Add a few happy path integration tests
	

3. Test performance with a simple load test utility
	* Autocannon was used to loadtest the endpoint.

		> 68k requests in 11.01s, 18.7 MB read

4. Generate documentation
	* Documentation displayed using the GraphiQL interface. The documentation was created for the pet type and can be seen in the intface or inline code comments.

5. Generate a client SDK
	* A simple "client SDK" can be generated using https://www.graphql-code-generator.com/#live-demo. It creates corresponding TypeScript code for the schema. The graphiQL playground can also be used to test out queries.

6. Connect to a persistent datastore
	* This will be done in the GRAND stack project. To learn and understand the API, a static datasource was used for each endpoint.