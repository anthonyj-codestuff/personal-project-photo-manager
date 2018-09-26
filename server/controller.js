const getAllPics = (req, res, next) => 
{
  const dbInst = req.app.get('db');
  dbInst.get_photos()
    .then(response => res.status(200).send(response))
    .catch(err => console.log(`Error in get_photos() - ${err}`));
}

const getPhoto = (req, res, next) =>
{
  const dbInst = req.app.get('db');
  dbInst.get_photo(req.params.pid)
    .then(response => res.status(200).send(response))
    .catch(err => console.log(`Error in get_photo() - ${err}`));
};

const searchPhotos = (req, res, next) =>
{
  // this function takes in a string of variables delimited by '+' to be used for the inclusive search.
  // It additionally includes variables prepended by '-' to filter out unwanted results
  // For example, the query coulld look like 'nature+animal+-dog+-cat'
  // split this into two arrays and evaluate each one separately
  console.log('queryTerms', req.query.terms);
  userTermArr = req.query.terms.trim().split(' ');
  console.log("userTermArr", userTermArr);
  incArr = userTermArr.filter(e => e[0] !== '-');
  console.log("incArr", incArr);
  excArr = userTermArr.filter(e => e[0] === '-');
  console.log("excArr", excArr);

  const dbInst = req.app.get('db');
  searchQuery = incArr //construct the positive part of the query
  .map((e,i) => `SELECT photo.pid, photo.url, photo.title, photo.uid, photo.datetime FROM tag_ref JOIN tag ON tag.tid = tag_ref.tid JOIN photo ON photo.pid = tag.pid WHERE tag_ref.tag_name = '${e}'`)
  .join(' INTERSECT ')
  .concat(';');
  //console.log(searchQuery);
  dbInst.query(searchQuery)
  .then(response => res.status(200).send(response))
  .catch(err => console.log(`Error in search_photos() - ${err}`));
}

//requires an image url (up to 200 char) and an integer representing the user's id
const addPhoto = (req, res, next) =>
{
  const dbInst = req.app.get('db');
  const {url, uid} = req.body;
  dbInst.post_photo([url, uid])
    .then(response => res.status(200).send(response))
    .catch(err => console.log(`Error in add_photo() - ${err}`));
};

const getPhotoTags = (req, res, next) =>
{
  const dbInst = req.app.get('db');
  const {pid} = req.params;
  dbInst.get_photo_tags(pid)
    .then(response => res.status(200).send(response))
    .catch(err => console.log(`Error in get_photo_tags() - ${err}`));
}

const getAllTags = (req, res, next) =>
{
  const dbInst = req.app.get('db');
  dbInst.get_all_tags()
    .then(response => res.status(200).send(response))
    .catch(err => console.log(`Error in get_all_tags() - ${err}`));
}

const getAliases = (req, res, next) => 
{
  const dbInst = req.app.get('db');
  dbInst.get_list_of_aliases()
    .then(response => res.status(200).send(response))
    .catch(err => console.log(`Error in get_list_of_aliases() - ${err}`));
}

const addAlias = (req, res, next) => 
{
  const dbInst = req.app.get('db');
  const {oldname, newname} = req.body;
  console.log('new alias:', oldname, newname);
  dbInst.add_alias(oldname, newname)
    .then(response => res.status(200).send(response))
    .catch(err => console.log(`Error in add_alias() - ${err}`));
}

const deleteAlias = (req, res, next) => 
{
  const dbInst = req.app.get('db');
  const {id} = req.params;
  console.log(id);
  dbInst.delete_alias(id)
    .then(response => res.status(200).send(response))
    .catch(err => console.log(`Error in delete_alias() - ${err}`));
}

const getImps = (req, res, next) => 
{
  const dbInst = req.app.get('db');
  dbInst.get_list_of_imps()
    .then(response => res.status(200).send(response))
    .catch(err => console.log(`Error in get_list_of_imps() - ${err}`));
}
const addImp = (req, res, next) => 
{
  const dbInst = req.app.get('db');
  const {predicate, implies} = req.body;
  console.log('new implication:', predicate, implies);
  dbInst.add_imp(predicate, implies)
    .then(response => res.status(200).send(response))
    .catch(err => console.log(`Error in add_imp() - ${err}`));
}
const deleteImp = (req, res, next) => 
{
  const dbInst = req.app.get('db');
  const {id} = req.params;
  console.log(id);
  dbInst.delete_imp(id)
    .then(response => res.status(200).send(response))
    .catch(err => console.log(`Error in delete_imp() - ${err}`));
}

module.exports =
{
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
};