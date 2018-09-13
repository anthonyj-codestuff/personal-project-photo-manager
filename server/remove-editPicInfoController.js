const massive = require('massive');

const editTitle = (req, res, next) =>
{
  //TODO: Server does not complain if there is no image with a matching ID
  const dbInst = req.app.get('db');
  const {pid, title} = req.body;
  dbInst.edit_photo_title([pid, title])
    .then(response => res.sendStatus(200))
    .catch(err => console.log(`Error in edit_photo_title() - ${err}`))
}

// This function adds new tags, but it does not delete them.
// This should only be used in conjunction with NewUploadForm component
// TODO: Make  this into a general purpose tag editor
const editTagsMain = (req, res, next) =>
{ 
  // Handling an arbirtary number of values in SQL is really difficult, so this function does it in JS
  // Declare db instance and dereference variables
  const dbInst = req.app.get('db');
  const {pid, tags} = req.body;
  console.log('pid', pid);
  console.log('tags', tags);

  // Step 1: Go through the new tags and check if any of them need to be added to the tag reference table
  dbInst.tag_ref.find() //get a copy of the tag_ref
      .then(tagObjArray => { //reference each entry in the table
          // check the database and filter out all user tags that already exist in the database
        let noDupes = tags.filter(usersTag => {
          // This DOES NOT remove duplicates in the user's input
          return !tagObjArray.some(e => (e.tag_name === usersTag) || (usersTag === ''));
        })
        //Step 2: Before defining noDupes, filter out all duplicate tags
        .filter((e, i, self) => i === self.indexOf(e));
        // At this point, the user's list is pared down to only the items that are not in the db and not duplicates of each other
        // Step 3: construct a query
        console.log("pid", pid);
        console.log("tags", tags);
        console.log("noDupes", noDupes);
        if(noDupes.length) //avoids trying to INSERT an empty list
        {
          let queryStr = "INSERT INTO tag_ref (tag_name) VALUES ";
          let queryStrValues = noDupes.map(e => `('${e}')`);
          queryStr += queryStrValues.join(",") + ";";
          console.log("queryString: ", queryStr);
          dbInst.query(queryStr)
            .then(response => res.sendStatus(200)) //sending a response here might cause problems
            .catch(err => console.log(`Error in controller.editTagsMain() [dbInst.query] - ${err}`));
        }
        else { res.sendStatus(200) }
        // By now, the tag_ref table has been populated without adding duplicates 
        // OR the user's input contained only duplicates and no query was sent
        // Now send the user's tag list to another function to associate the tags with the picture
        changePhotoTags(req, res, tags, pid);
        return res.sendStatus(200);
      })
      .catch(err => console.log(`Error in controller.editTagsMain() [filter dupes] - ${err}`))

}

// Do not export. This function is used by editTagsMain to stop it from getting enormous
// user input has NOT been sanitized
const changePhotoTags = (req, res, arr, pid) =>
// The tag_ref table should now be populated with any new tags supplied by the user
// To apply tags to pictures, retrieve a list of existing tags and check for differences
// Any tags that do not exist in the user's query should be deleted
// Any new tags should be inserted
// Do not insert tags that already exist
{
  console.log(`Incoming data: ${arr}, ${pid}`)
  const dbInst = req.app.get('db');
  dbInst.tag.find()
  .then(tagObjArray => console.log("tagObjArray", tagObjArray))
  .catch(`Error in controller.changePhotoTags() - ${err}`)
}

module.exports =
{
  editTitle,
  editTagsMain
};