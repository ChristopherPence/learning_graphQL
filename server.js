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
		getPet(id: ID): Pet
		getPetTag(tag: String): Pet
		getOrder(id: ID): Order
		getUser(name: String): User
		getStore: Store
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
	},

	type User{
		id: ID!,
		name: String,
		email: String
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

class User{
	constructor(id, name, email){
		this.id = id;
		this.name = name;
		this.email = email;
	}
}

// Build the resolver for the endpoint
var root = {
	getPet: ({id}) => {
		return new Pet(id);
	},

	getPetTag: ({tag}) => {
		if(tag == "crazy" || tag == "insane"){
			return new Pet(4);
		}
	},

	getOrder: ({id}) => {
		new Store().orders.forEach((item) => {
			if(item.id == id){
				return item;
			}
		});
	},

	getUser: ({name}) => {
		return new User(7, name, name + "@jahnelgroup.com");
	},

	getStore: () => {
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