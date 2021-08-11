// Following along with the tutorial on graphql.org
// https://graphql.org/graphql-js/running-an-express-graphql-server/

var app = require('express')();
// var app = express();
var {graphqlHTTP} = require('express-graphql');
var {buildSchema} = require('graphql');

// Build the graphQL schema
var schema = buildSchema(`
	type Query{
		pet: {
			id: Int,
			name: String
		}
	}
`);

// Build the resolver for the endpoint
var root = {
	pet: () => {
		return 'Hello World!';
	},
};


app.use('/graphql', graphqlHTTP({
	schema: schema,
	rootValue: root,
	graphiql: true,
}));
app.listen(3000);

// Code to use without express, when just running a basic
// 	graphQL application.
/*	
graphql(schema, '{hello}', root).then((response) => {
	console.log(response);
});
*/