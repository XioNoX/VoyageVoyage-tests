//cleaning the database
db.users.remove();

//array of all the possible destinations 
var dest = [
	{city:"Paris", country:"France"},
	{city:"Montreal", country:"Canada"},
	{city:"New-York", country:"USA"},
	{city:"Quebec", country:"Canada"},
	{city:"London", country:"England"}
];

//designing the users with their trips
for(var i = 0; i < 1000; i++) {
	var trips =[];
	//for each user a random number of trip is computed
	var nbtrips = Math.floor(Math.random() * dest.length);
	for(var j = 0; j < nbtrips; j++) {
		//for each trip we choose a random destination 
		trips.push(dest[Math.floor(Math.random() * dest.length)]);
	}
	var user = {name:"felix "+i, trips:trips};
	db.users.save(user);
}

//find the users who has been in France
var userfr = db.users.find({trips:{$elemMatch:{country:"USA"}}}, {name:true});
print("nomber of users who has been in France : "+userfr.count());
userfr.forEach(printjson);
