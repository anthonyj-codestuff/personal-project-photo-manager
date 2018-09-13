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

async function editTagsMain(req, res, next)
{
  // Send any unknown tags supplied by the user to the tag_ref table
  await newTagsToReferenceTable(req, res);
  // Alter the tags associated with a single pid to match the user's request
  changePhotoTags(req, res);
  res.sendStatus(200);
}

async function newTagsToReferenceTable(req, res)
// Handling an arbirtary number of values in SQL is really difficult, so this function does it in JS
// Declare db instance and dereference variables
{
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
          dbInst.query(queryStr);
        }
      })
      .catch(err => console.log(`Error in controller.editTagsMain() [filter dupes] - ${err}`));

}

async function changePhotoTags(req, res)
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
    dbInst.delete_photo_tag([str, pid]);
  });
  toAdd.forEach(str => {
    dbInst.add_photo_tag([str, pid]);
  });
}

module.exports =
{
  editTitle,
  editTagsMain
};