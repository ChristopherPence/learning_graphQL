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

	type Mutation{
		createPet(id: ID, name: String, tags: [String]): Pet,
		updatePet(id: ID, name: String, tags: [String]): Pet,
		deletePet(id: ID): Boolean
	},

	"""The pet type represents a real life pet. Each gets a unique ID. Names and tags don't have to be unqiue."""
	type Pet{
			"""Unique pet identifier"""
		id: ID!,
			"""The name of the pet. Doesn't have to be unique"""
		name: String,
			"""Tags for the pet. Stored as a list of strings to help group the pet with others"""
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
	constructor(id, name = "Cheese Ball", tags = ["crazy", "insane"]){
		this.id = id;
		this.name = name
		this.tags = tags
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

var pets = [new Pet(5)]

// Build the resolver for the endpoint
var root = {
	getPet: ({id}) => {
		pets.forEach((pet) => {
			if(pet.id == id){
				console.log(pet);
				console.log(typeof(pet));
				console.log(new Pet(5));
				console.log(typeof(new Pet(5)));
				return pet;
			}
		});
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

	createPet: ({id, name, tags}) => {
		pet = new Pet(id, name, tags);
		pets.push(pet);
		console.log(pets);
		return pet;
	},

	updatePet: ({id, name, tags}) => {
		pets.forEach((pet) => {
			if(pet.id == id){
				pet.name = name;
				pet.tags = tags;
			}
		});
		console.log(pets);
		return new Pet(id, name, tags);
	},

	deletePet: ({id}) => {
		for(var i = 0; i < pets.length; i++){
			if(pets[i].id == id){
				pets.splice(i, 1);
			}
		}
		// Not good practice
		console.log(pets);
		return true;
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

/*
	createOrder(id: ID, item: String): Order,
	deleteOrder(id: ID): Boolean

	createUser
	deleteUser
*/