const express = require('express');
const { json } = require('body-parser');
const massive = require('massive');
const path = require('path'); // Usually moved to the start of file
// const fbConfig = require('./firebaseAuth');
require('dotenv').config();

const port = process.env.SERVER_PORT || 3001;

const {
  getAllPics,
  getPhoto,
  searchPhotos,
  addPhoto,
  getPhotoTags,
  getAllTags,
  getAliases,
  addAlias,
  deleteAlias,
  getImps,
  addImp,
  deleteImp
} = require('./controller');

const {
  editTitle,
  editTagsMain
} = require('./editPicInfoController');

const app = express();
app.use(json());

//Connect Massive to Heroku
massive(process.env.DB_CONNECTION)
.then(dbInst => app.set('db', dbInst))
.catch(err => console.log(`Error in massive() - ${err}`));

// point server to the build folder
app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.get('/api/photos', getAllPics);       //for loading all (or some) pictures
app.get('/api/photos/:pid', getPhoto);    //for loading a specific picture
app.get('/api/tags/all', getAllTags);     //Gets a list of tag names. Should be listed before getPhotoTags to avoid conflicts
app.get('/api/tags/:pid', getPhotoTags);
app.get('/api/search', searchPhotos);     //send a string of '+' delimited substrings
app.get('/api/alias', getAliases);        //gets a list of defined alias objects
app.get('/api/imp', getImps);             //gets a list of user-defined tag implications
app.post('/api/alias', addAlias);         //sends a new alias to the database list
app.post('/api/imp', addImp);             //sends a new implication to the database
// app.get('/api/folder/:id');            //pull up the contents of a defined folder
app.post('/api/submit', addPhoto);        //for posting a single picture with or without data
// app.post('/api/folder');               //for creating new folders
// app.put('/api/photos/:id');            //for editing a photo's data (adding a description, tags, etc)
// app.put('/api/folder');                //for adding photo ids to a folder
// app.put('/api/me');                    //MAYBE - editing the user's information or profile stats
// app.delete('/api/photos/:id');         //delete a user's own photo (pid must match)
app.delete('/api/alias/:id', deleteAlias);//Deletes a user-defined alias
app.delete('/api/imp/:id', deleteImp);    //Deletes a user defined tag implication
// app.delete('/api/folder/:id');         //delete a user's own folder WITHOUT DELETING CONTENTS (pid must match)

//Editing Picture Information
app.put('/api/edit_title', editTitle);
app.put('/api/edit_tags', editTagsMain);


app.listen(port, () => console.log(`Listening for requests on port ${port}`));