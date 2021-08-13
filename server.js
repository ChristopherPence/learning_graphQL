// Following along with the tutorial on graphql.org
// https://graphql.org/graphql-js/running-an-express-graphql-server/

var app = require('express')();
// var app = express();
var {graphqlHTTP} = require('express-graphql');
var {buildSchema} = require('graphql');

// Build the graphQL schema
var schema = buildSchema(`
	type Query{
		hello: String,
		pet(id: ID): Pet
		store: Store
	},

	type Pet{
		id: ID!,
		name: String,
		tags: [String]
	},

	type Order{
		id: ID!,
		item: String
	},

	type Store{
		inventory: [String],
		orders: [Order]
	}
`);


class Pet{
	constructor(id){
		this.id = id;
		this.name = "Cheese Ball";
		this.tags = ["crazy", "insane"];
	}
}

class Order{
	constructor(id,item){
		this.id = id;
		this.item = item;
	}
}

class Store{
	constructor(){
		this.inventory = ["Bone", "Brush", "Mouse plushie"];
		this.orders = [new Order(1, "Dog Food"), new Order(2,"Cat Food")];
	}
}




// Build the resolver for the endpoint
var root = {
	pet: ({id}) => {
		return new Pet(id);
	},

	store: () => {
		return new Store();
	},

	hello: () => {
		return "Hello World";
	},


};



app.use('/graphql', graphqlHTTP({
	schema: schema,
	rootValue: root,
	graphiql: true,
}));
app.listen(3000);
console.log("Online");

// Code to use without express, when just running a basic
// 	graphQL application.
/*	
graphql(schema, '{hello}', root).then((response) => {
	console.log(response);
});
*/