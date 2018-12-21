"# Geo app " 

This project is to get the latitude and longitude of a given address, store it in database and display the search history

1. Folder structure 
	geo-app
		app
			api.js   -- common api's
			config.josn -- configurations like port number, mongo db database details
			mongo.js  -- mongo operations
			router.js -- routing 
			server.js -- server execution starts here
		public
			css
				style.css 
		views
			index.ejs
		package.json


2.	To set configurations
	goto geo-app - app - config.json and edit the details

3.	goto geo-app 
	run "npm install"
	then "npm run test" --console you will see the service is runing at PORT_NUMBER mentioned

4.	goto UI localhost:PORT_NUMBER UI explains better(simple UI).

5. Database used is mongodb
	I have made search address as primary key, if the address is already serached gtting it from DB, not calling the API again.
	and displaying the search history from database.

  