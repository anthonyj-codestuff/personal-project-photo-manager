
const getAllPics = (req, res, next) => 
{
  const dbInst = req.app.get('db');
  dbInst.get_photos()
    .then(response => res.status(200).send(response))
    .catch(err => console.log(`Error in get_photos() - ${err}`))
}

const getPhoto = (req, res, next) =>
{
  const dbInst = req.app.get('db');
  dbInst.get_photo(req.params.pid)
    .then(response => res.status(200).send(response))
    .catch(err => console.log(`Error in get_photo() - ${err}`))
};

//requires an image url (up to 200 char) and an integer representing the user's id
const addPhoto = (req, res, next) =>
{
  const dbInst = req.app.get('db');
  const {url, uid} = req.body;
  dbInst.post_photo([url, uid]) //TODO - user id is set to 1 for now, but change this when there are users
    // .then(response => res.status(200).send(response))
    .then(response => res.status(200).send(response))
    .catch(err => console.log(`Error in add_photo() - ${err}`))
};

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
const editTags = (req, res, next) =>
{
  // Declare db instance and dereference variables
  const dbInst = req.app.get('db');
  const {pid, tags} = req.body;

  // Assume that the user has sent a large number of tags.
  // Handling an arbirtary number of values in SQL is really difficult, 

  console.log("EditTags1", req.body);
  dbInst.edit_photo_tags([pid, tags])
    .then(response => {
      console.log("EditTags2", response);
      return res.sendStatus(200);
    })
    .catch(err => {
      console.log(`Error in edit_photo_tags() - ${err}`)
      return res.sendStatus(400);
    })
}

module.exports =
{
  getAllPics,
  getPhoto,
  addPhoto,

  //pic data editing
  editTitle,
  editTags
};