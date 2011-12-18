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

db.system.js.save({ _id : "people_with_common_trips", value : function (_name){
			//Sans toArray, ca retourne un curseur -> donc pas bon
			var t = db.users.find({name: _name},{_id:false,trips:true}).toArray();
			// Acces à l'attribut trips de l'objet retourné (à savoir les voyages de l'utilisateur passé en paramètre)
			var array_trips = t[0].trips;
			var results = [];
			for(i=0;i<array_trips.length;i++){
				var _city=array_trips[i].city;
				var cursorUsers = db.users.find({name:{$ne : _name},trips:{$elemMatch:{city:_city}}}, {name:true, _id:false});
				if(cursorUsers.count() > 0){
					results.push(cursorUsers.toArray());
				}
			}
			return results;
		}
	}
	);



//QUERIES
print("people who travelled to Bruxelles : ");
db.users.find({trips:{$elemMatch:{city:"Bruxelles"}}},{trips:false, _id:false}).forEach(printjson);

print("people who travelled to San Francisco : ");
db.users.find({trips:{$elemMatch:{city:"San-Francisco"}}}, {name:true}).forEach(printjson);

print("people who when to Canada : ");
db.users.find({trips:{$elemMatch:{country:"Canada"}}}, {name:true}).forEach(printjson);

print("people who travelled to Island : ");
db.users.find({trips:{$elemMatch:{country:"Island"}}}, {name:true}).forEach(printjson);

print("people who travelled to Autralia : ");
db.users.find({trips:{$elemMatch:{city:"Sydney"}}}, {name:true}).forEach(printjson);



print("People who had gone in the same cities as Jeremy");
var test = db.eval("people_with_common_trips('Jeremy')");
print(tojson(test));
