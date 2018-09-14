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
  dbInst.post_photo([url, uid])
    .then(response => res.status(200).send(response))
    .catch(err => console.log(`Error in add_photo() - ${err}`))
};

const getPhotoTags = (req, res, next) =>
{
  const dbInst = req.app.get('db');
  const {pid} = req.params;
  dbInst.get_photo_tags(pid)
    .then(response => res.status(200).send(response))
    .catch(err => console.log(`Error in get_photo_tags() - ${err}`))
}

module.exports =
{
  getAllPics,
  getPhoto,
  addPhoto,
  getPhotoTags
};