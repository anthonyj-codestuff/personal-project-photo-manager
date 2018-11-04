This tool allows the user to manage and categorize images based on user-defined tags and rules
The user is able to:
  * Upload images
  * Apply tags (categories) to images
  * Apply rules for managing tags
    * Tags can be given an alias in the event of common misspellings or identical meanings (eg: outside = outdoors)
    * Tags can be instructed to implicate other tags in the event of tags that share common traits (eg: swimming < water)
  * Apply a mass tagging operation on a custom pool of images (UNDER CONSTRUCTION)

![Front page view of photo management website and demonstration of search modal](https://i.imgur.com/RX0HPGk.gif)

![Demonstration of user-defined custom rules](https://i.imgur.com/bXnuljb.png)

![All screenshots of mobile website](https://i.imgur.com/ZhGIA2U.png)

SETUP INSTRUCTIONS
To set up from scratch (assuming that VSCode and NPM are installed properly on your system. 
  Also create a project at Heroku and install Postgres on it):
1: Run script in create_new_tables.sql to set up PostgreSQL database if accessing database directly. This step will be deprecated in a later version.
2: Create a new .env file under the root dir
		DB_CONNECTION= [YOUR HEROKU CREDENTIALS STRING + '?ssl=true']
		SERVER_PORT=3001
		REACT_APP_API_KEY= [config.apiKey]
		REACT_APP_AUTH_DOMAIN= [config.authDomain]
		REACT_APP_DB_URL= [config.databaseURL]
		REACT_APP_PROJECT_ID= [config.projectId]
		REACT_APP_STORAGE_BUCKET= [config.storageBucket]
		REACT_APP_MESSAGING_SENDER_ID= [config.messagingSenderId]
4: Create a new Google Firebase project and give it a name (console.firebase.google.com)
	Open the Develop Menu and Click Storage and Get Started to activate Storage functionality
	Click Rules and change 'request.auth != null;' to 'true' (this is not a permanent thing and should be removed after auth0 is set up)
5: As of 2018-11-03, your Firebase credentials should be located on your project page. Find them by clicking the </> button and fill in your .env file
6: Activate Functions on Firebase and run 'npm install -g firebase-tools' followed by 'firebase-init' and 'firebase-deploy'. 
	You may be asked to run 'firebase-login' as well
	On init, press space to select Functions and confirm

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
