This tool allows the user to manage and categorize images based on user-defined tags and rules
The user is able to:
  * Upload images
  * Apply tags (categories) to images
  * Apply rules for managing tags
    * Tags can be given an alias in the event of common misspellings or identical meanings (eg: outside = outdoors)
    * Tags can be instructed to implicate other tags in the event of tags that share common traits (eg: swimming < water)
  * Apply a mass tagging operation on a custom pool of images (UNDER CONSTRUCTION)

### Front page view of photo management website and demonstration of search modal
![Front page view of photo management website and demonstration of search modal](https://i.imgur.com/RX0HPGk.gif)
### Demonstration of user-defined custom rules

Aliases transform one tag into a replacement tag to consolidate terms and account for common spelling errors

Implications add additional terms whenever one tag would imply the existence of another
![Demonstration of user-defined custom rules](https://i.imgur.com/bXnuljb.png)

### All screenshots of mobile website
![All screenshots of mobile website](https://i.imgur.com/bfveSLu.png)

### Setup Instructions
To set up from scratch (assuming that VSCode and NPM are installed properly on your system. 

Also create a project at Heroku and install Postgres on it):

1.   Run script in **create_new_tables.sql** to set up PostgreSQL database if accessing database directly. This step will be deprecated in a later version.
2.   Create a new .env file under the root dir

	DB_CONNECTION= [YOUR HEROKU CREDENTIALS STRING + ?ssl=true]
 	SERVER_PORT= [3001 or preferred port]
 	REACT_APP_API_KEY= [config.apiKey]
 	REACT_APP_AUTH_DOMAIN= [config.authDomain]
 	REACT_APP_DB_URL= [config.databaseURL]
 	REACT_APP_PROJECT_ID= [config.projectId]
 	REACT_APP_STORAGE_BUCKET= [config.storageBucket]
 	REACT_APP_MESSAGING_SENDER_ID= [config.messagingSenderId]

3. Create a new Google Firebase project and give it a name (console.firebase.google.com)  
Open the Develop Menu and Click Storage and Get Started to activate Storage functionality  
Click Rules and change **request.auth != null;** to **true** (this is not a permanent thing and should be removed after auth0 is set up)
4. As of 2019-05-12, your Firebase credentials should be located on your project settings page. Find them by clicking the </> button and registering the program. Then fill in your .env file
5. Activate Functions on Firebase and run **npm install -g firebase-tools** followed by **firebase init** and **firebase-deploy**.  
You may be asked to run **firebase login** as well  
On init, press space to select Functions and confirm  
If you get **Error: 403, The caller does not have permission**, delete the contents of **.firebaserc** and try again  
Point firebase-init to your project and choose Javascript (or Typescript) as your preferred language. Install requested dependencies  
6. Check **Plans/Firebase Resize Function** and copy the funtion to the requested location. This funtion will allow Firebase to automatically resize images as they are uploaded  
If you are on Windows, you may also need to go to **.firebase.json** and change **$RESOURCE_DIR** with **%RESOURCE_DIR%** before the next step  
I also had to run **cd functions\\** followed by **npm i @google-cloud/storage@1.7 child-process-save** to get it running a second time  
7. Run **firebase deploy** to activate the script  
8. Should work. Message me if you have problems.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
