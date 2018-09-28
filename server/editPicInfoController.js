const { _, flatten } = require('lodash');

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

async function applyTagToMass(req, res, next)
{
  // okay, a lot of things are going to start happening at once. The function stack below 
  // is not made to handle multiple pictures, but it can handle one at a time pretty effectively.
  // The function stack expects a single pid (string) and an array of strings (tag)
  // ex. BODY { pid: '487',
  //            tags: [ 'bat', 'mammal', 'sleepy', 'underground' ] }
  // GOAL: Retrieve all of the variables necessary to trigger the function stack manually
  const dbInst = req.app.get('db');
  const {term, arr} = req.body;

  const massPromise = new Promise(async (resolve, reject) => {
    const promises = arr.map(pid => {
      console.log(pid)
      return dbInst.get_photo_tags(pid)
    });
    resolve(await Promise.all([...promises]))
  })
  const data = await massPromise;
  // data comes back as raw SQL data and the stack expects a clean array of strings
  // clean the array and make it a 2D string array
  cleanData = data.map(arr => arr.map(obj => obj.tag_name));
  console.log(cleanData);
  
}

// restructuring functions here to be synchronous. Each function should call the next one as a callback
const editTagsMain = (req, res, next) =>
{
  console.log('BODY', req.body);
  var allSmall;
  {req.body.tags ? allSmall = req.body.tags.map(e => e.toLowerCase()) : null}
  req.body.tags = allSmall;
  // SEQUENCE: Each function passes the next function in the chain as a callback
  //           handleTagImplications() - analyzes the user's input and inserts implied tags
  //           aliasUserTags() - alters tag list to conform to user-defined tagging rules
  //           newTagsToReferenceTable() - adds a new ID number to any unknown tags
  //           changePhotoTags() - Applies all requested tags to the specified picture and removes tags not requested
  handleTagImplications(req, res, aliasUserTags);
  res.sendStatus(200);
}

async function handleTagImplications(req, res, callback)
{
  const dbInst = req.app.get('db');
  let {tags} = req.body; //not const. Implied tags will be added to the end of the array for double-checking
  let tagLenBefore;//defined at the top of the loop
  let tagLenAfter; //defined after the loop is run
  
  //This block should run at least one time, but if changes are made to the tag
  // list, the list should be double checked to take care of chained implications
  do {
  tagLenBefore = tags.length;
  const impPromise = new Promise(async (resolve, reject) => {
    const promises = tags.map(str => {
      return dbInst.handle_tag_imp(str)
    });
    resolve(await Promise.all([...promises]))
  });
  const data = await impPromise;
  // convert data from a 2D array of arrays and objects to a 1D array of strings
  trimData = _.flatten(data).map(e => e.implies);
  trimData.map((e,i,s) => {
    !tags.includes(e) ? tags.push(e) : null
  });
  tagLenAfter = tags.length;
  console.log('Implied tags discovered:', trimData);
  }while(tagLenAfter > tagLenBefore);

  callback(req, res, newTagsToReferenceTable);
}

async function aliasUserTags(req, res, callback)
{
  // Takes in newTagToReferenceTable as a callback
  const dbInst = req.app.get('db');
  const {tags} = req.body;
  // create an array of promises that must be resolved before moving on
  // for each tag supplied by the user, poll it against the db to see if it has an alias
  const tagsPromise = new Promise(async (resolve, reject) => {
    const promises = tags.map(str => {
      return dbInst.alias_photo_tag(str)
    });
    resolve(await Promise.all([...promises]))
  });
  const data = await tagsPromise;

  console.log("initial tags", req.body.tags);
  req.body.tags = req.body.tags.map((e,i) => {
    if(data[i].length > 0) 
    {
      return data[i]['0'].new_name;
    }
    else
    {
      return e;
    }
  })
  console.log("resulting tags", req.body.tags);
  // call newTagToReferenceTable and pass in the next callback
  callback(req, res, changePhotoTags);
}

async function newTagsToReferenceTable(req, res, callback)
// Handling an arbirtary number of values in SQL is really difficult, so this function does it in JS
// Declare db instance and dereference variables
{
  // takes in changePhotoTags as a callback
  const dbInst = req.app.get('db');
  const {tags} = req.body;
  console.log('ENTERING newTagsToReferenceTable()');

  await dbInst.tag_ref.find() //get a copy of the tag_ref
      .then(tagObjArray => { //reference each entry in the table
        // removes duplicate tags and empty strings from the user input
        let sanitizedInput = tags.filter((e, i, self) => (e !== '') && (i === self.indexOf(e)));
        //console.log("sanitizedInput =", sanitizedInput);
        // gets an array of all existing tags in tag_ref table
        let existingTags = tagObjArray.map(e => e.tag_name);
        //console.log("existingTags =", existingTags);
        // filters out all user tags that already exist in the tag_ref
        let tagsToInsert = sanitizedInput.filter(e => !existingTags.includes(e));
        //console.log("tagsToInsert =", tagsToInsert);

        // this section takes the gathered information and construct a query that will insert any tag that is not found in existingTags
        if(tagsToInsert.length) //avoids trying to INSERT an empty list
        {
          let queryStr = "INSERT INTO tag_ref (tag_name) VALUES ";
          let queryStrValues = tagsToInsert.map(e => `('${e}')`);
          queryStr += queryStrValues.join(",") + ";";
          console.log("queryString: ", queryStr);
          // send query to the DB
          dbInst.query(queryStr);
        }
      })
      .catch(err => console.log(`Error in controller.editTagsMain() [filter dupes] - ${err}`));
  callback(req, res);
}

async function changePhotoTags(req, res, callback = null)
// The tag_ref table should now be populated with any new tags supplied by the user
// To apply tags to pictures, retrieve a list of the picture's existing tags and check for differences
// 1. Any tags that do not exist in the user's query should be deleted
// 2. Do not insert tags that already exist
// 3. Any new tags should be inserted
{
  const {tags, pid} = req.body;
  let sanitizedInput = tags.filter((e, i, self) => (e !== '') && (i === self.indexOf(e)))
  console.log("SECOND sanitizedInput =", sanitizedInput);
  const dbInst = req.app.get('db');

  //obtain any tags that already exist on 'tag' table and reduce them to a simple array
  existingTags = await dbInst.get_photo_tags(pid);
  existingTags = existingTags.map(e => e.tag_name);

  // Step 1: obtain all tags that should be deleted from the table
  toDelete = existingTags.filter(e => !sanitizedInput.includes(e));
  // Step 2: filter out existing tags from user's input
  toAdd = sanitizedInput.filter(e => !existingTags.includes(e));

  toDelete.forEach(str => {
    console.log(`Removing tag '${str}'`);
    dbInst.delete_photo_tag([str, pid]);
  });
  toAdd.forEach(str => {
    console.log(`Applying tag '${str}'`);
    dbInst.add_photo_tag([str, pid]);
  });
}

module.exports =
{
  editTitle,
  editTagsMain,
  applyTagToMass
};