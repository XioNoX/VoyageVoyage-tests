/*
	celle-ci est une base assez simple pour pouvoir se familiariser avec Mongodb et pouvoir vérifier à la main que les résultats des requêtes sont correctes 
	N'hesitez pas à rajouter des voyages pour pouvoir vraiment tester les possibilités de filtres
*/

//cleaning the database
db.users.remove();

//array of all the possible destinations 
var paris = {city:"Paris", country:"France"};
var montreal = {city:"Montreal", country:"Canada"};
var vaxjo =	{city:"Vaxjo", country:"Sweden"};
var sanfran = {city:"San-Francisco", country:"USA"};
var brux = {city:"Bruxelles", country:"Belgium"};
var quebec = {city:"Quebec", country:"Canada"};
var derry = {city:"Derry", country:"Ireland"};
var island = {city:"Reykjavik", country:"Island"};
var sydney = {city:"Sydney", country:"Australia"};

var users = [
	{name:"Jeremy", trips:[sanfran, brux, quebec]},
	{name:"Thomas", trips:[montreal, brux, paris]},
	{name:"Arzhel", trips:[vaxjo, sanfran, brux, island]},
 	{name:"Julien", trips:[brux, derry, island]},
	{name:"Dimitri", trips:[brux, sydney, paris]}
];

for(u in users) {
	var user =  users[u];
	db.users.save(user);
}



//QUERIES
print("people who travelled to Bruxelles : ");
db.users.find({trips:{$elemMatch:{city:"Bruxelles"}}}, {name:true}).forEach(printjson);

print("people who travelled to San Francisco : ");
db.users.find({trips:{$elemMatch:{city:"San-Francisco"}}}, {name:true}).forEach(printjson);

print("people who when to Canada : ");
db.users.find({trips:{$elemMatch:{country:"Canada"}}}, {name:true}).forEach(printjson);

print("people who travelled to Island : ");
db.users.find({trips:{$elemMatch:{country:"Island"}}}, {name:true}).forEach(printjson);

print("people who travelled to Autralia : ");
db.users.find({trips:{$elemMatch:{city:"Sydney"}}}, {name:true}).forEach(printjson);
