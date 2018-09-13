-- Deletes a numer pair from the 'tag' table if the picture ID AND the number returned from 'tag_ref' are found
-- $1: str
-- $2: pid

DELETE FROM tag USING tag_ref 
  WHERE tag.tid = tag_ref.tid
  AND tag_ref.tag_name = $1 
  AND tag.pid = $2;

-- DELETE FROM tag USING tag_ref 
--   WHERE tag.tid = tag_ref.tid
--   AND tag_ref.tag_name = 'shark' AND tag.pid = 433;
