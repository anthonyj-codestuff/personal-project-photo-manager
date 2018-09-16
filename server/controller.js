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

const searchPhotos = (req, res, next) =>
{
  userTermArr = req.query.terms.split(' ');
  const dbInst = req.app.get('db');
  searchQuery = userTermArr
  .map((e,i) => `SELECT photo.pid, photo.url, photo.title, photo.uid, photo.datetime FROM tag_ref JOIN tag ON tag.tid = tag_ref.tid JOIN photo ON photo.pid = tag.pid WHERE tag_ref.tag_name = '${e}'`)
  .join(' INTERSECT ')
  .concat(';');
  console.log(searchQuery);
  dbInst.query(searchQuery)
  .then(response => res.status(200).send(response))
  .catch(err => console.log(`Error in search_photos() - ${err}`))
}

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
  searchPhotos,
  addPhoto,
  getPhotoTags
};