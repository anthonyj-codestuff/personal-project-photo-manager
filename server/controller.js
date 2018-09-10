
const getAllPics = (req, res, next) => 
{
  const dbInst = req.app.get('db');
  dbInst.get_photos()
    .then(response => res.status(200).send(response))
    .catch(err => console.log(`Error in get_photos() - ${err}`))
}

//requires an image url (up to 200 char) and an integer representing the user's id
const getPhoto = (req, res, next) =>
{
  const dbInst = req.app.get('db');
  dbInst.get_photo(req.params.pid)
    .then(response => res.status(200).send(response))
    .catch(err => console.log(`Error in get_photo() - ${err}`))
};

const addPhoto = (req, res, next) =>
{
  const dbInst = req.app.get('db');
  const {url, uid} = req.body;
  // console.log("url ", url);
  // console.log("uid ", uid);
  dbInst.post_photo([url, uid]) //TODO - user id is set to 1 for now, but change this when there are users
    // .then(response => res.status(200).send(response))
    .then(response => res.status(200).send(response))
    .catch(err => console.log(`Error in add_photo() - ${err}`))
};

module.exports =
{
  getAllPics,
  getPhoto,
  addPhoto
};